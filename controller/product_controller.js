
const Product = require('../model/product');
const Variant = require('../model/variant');

//create product controller 
module.exports.createProduct = async function(req,res){
    try{

        console.log(req.body);
        const newProduct = await Product.create({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            variants:req.body.variants
        })
        //save the product to the database  
        res.status(201).json({ 
             message:"product created successfully",
             data:newProduct
        })

    }
    catch(err){
         console.log('Error in creating the product', err);
         res.status(500).json({
             error:'Internal Server Error'
         })
    }
}
//get all the products
module.exports.getAllProducts = async function(req,res){

     try{  
         const productList =  await Product.find({});

         res.status(201).json({
             message:"this all product list",
             data:productList
         })
     }
     catch(err){
        console.log('Error in creating the product', err);
        res.status(500).json({
            error:'Internal Server Error'
        })
     }

}
//get product by id
module.exports.getProduct = async function(req,res){
    
     try{

        const productId = req.params.id;
        const product = await Product.findById(productId);

        if(!product){
            //if the product not found with given id
            return res.status(404).json({
                 error:'Product not found'
            });
        }
         res.status(200).json({
             message:"detailed info about the product",
             data:product
         })

     }
     catch{
         
        console.log('Error in  getting the product info', err);
        res.status(500).json({
            error:'Internal Server Error'
        })
     }
    
}
//search the product
// module.exports.searchProduct = async function(req,res){
     
//     try{
        
//         const query = req.params.query;

//         //search products by name ,description or variant name

//         const products = await Product.find({
             
//             $or:[
                
//                 {name: {$regex:query,$options:'i'}},
//                 {description:{$regex:query,$options:'i'}},
//                 {'variants.name':{$regex:query,$options:'i'}},
//             ],
//         }).populate('variants');


//         console.log("Product found" , products);
//         res.status(200).json({
//              message:"list of products ",
//              data:products
//         })
//     }
//     catch(err){
//         console.log('Error in  searching the product info', err);
//         res.status(500).json({
//             error:'Internal Server Error'
//         })

//     }
// }

// productController.js
module.exports.searchProduct = async function(req, res) {
    try {
      const query = req.params.query;
  
      console.log('Search Query:', query);
  
      // Search products by name, description, or variant name
      const products = await Product.find({
        $or: [
          { name: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } },
          { 'variants.name': { $regex: new RegExp(query, 'i') } },
        ],
      }).populate('variants');
  
      console.log('MongoDB Query:', {
        $or: [
          { name: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } },
          { 'variants.name': { $regex: new RegExp(query, 'i') } },
        ],
      });
  
      console.log('Product found', products);
  
      res.status(200).json({
        message: 'List of products',
        data: products,
      });
    } catch (err) {
      console.log('Error in searching the product info', err);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  };
  
//delete product controller
module.exports.deleteProduct = async function(req,res){
    try{
        
         console.log("The product  delete function is called");
           const productId = req.params.id;
           const deletedProduct = await Product.findByIdAndDelete(productId);
           if(!deletedProduct){
                console.log('Product not found');
                res.status(404).json({
                     error:"Product not found"
                })
           }
          // Delete associated variants
          await Variant.deleteMany({ _id: { $in: deletedProduct.variants } });

           res.status(200).json({
              message:"Product deleted successfully",
              data:deletedProduct
           })
    }
    catch(err){
        console.log('Error in deleting  the product', err);
        res.status(500).json({
            error:'Internal Server Error'
        })
    }
}
//update product controller
module.exports.updateProduct = async function(req,res){ 
      try{
            const productId = req.params.id;
            //update the product  by id
            const product = await Product.findByIdAndUpdate(productId,{
                name:req.body.name,
                description:req.body.description,
                price:req.body.price,
                variants:req.body.variants,
            },{
                new:true,
                runValidators:true
            });

            if(!product){
                
                console.log('Product not found');

                res.status(404).json({
                    error:'Product not found'
                });
            }
            res.status(201).json({
                message:"the product info Update successfully",
                data :product
            })
      }
      catch(err){
            console.log('Error in updating the product', err);
            res.status(500).json({
                error:'Internal Server Error'
            })
      }

}
//adding variants to the product 
module.exports.addVariantsToProduct = async function(req,res){
    
     try{
         
         const productId = req.params.id;

         const product = await Product.findById(productId);

         if(!product){
            
             console.log('Product not found');
             res.status(404).json({
                 error:'Product not found'
             })
         }
         
         //create new variants and add them in to product

         const newVariants = await Variant.create({
              name:req.body.name,
              sku:req.body.sku,
              additionalCost:req.body.additionalCost,
              stockCount:req.body.stockCount
         })
          
         //add variant to the product
         product.variants.push(newVariants);
         //save product to database
         const updateProduct = await product.save();

         res.status(200).json({   
             message:"The product variants added successfully",
             data:updateProduct
         })
     }
     catch(err){
         
        console.log('Error in adding variant  to the product', err);
        res.status(500).json({
            error:'Internal Server Error'
        })

     }

}




