
const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const bodyParser = require('body-parser');

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use('/', require('./routes'));


app.listen(port , function(err){
      if(err){
         console.log("Error in the running the server");
      }
      console.log("Server is running on port" , port);
})