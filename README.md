# ProductAPI

## Project Overview
ProductAPI is a simple CRUD (Create, Read, Update, Delete) API designed for managing products and their variants. It facilitates the creation, retrieval, update, and deletion of products, as well as the ability to search for products based on name, description, or variant name. Additionally, the API allows for the addition of variants to existing products.

## Table of Contents
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Architectural Decisions](#architectural-decisions)
- [Assumptions](#assumptions)
- [Instructions](#instructions)

## Setup
### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [Express.js](https://expressjs.com/) installed
- [MongoDB](https://www.mongodb.com/) installed and running

### Installation
1. Clone the repository:
    ```bash
    git clone <https://github.com/harish675/Product__API>
    cd <project-folder>
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

## API Endpoints
1. **Create a New Product Endpoint:**
    - **Method:** POST
    - **Endpoint:** `/product/create`
    - **Description:** Creates a new product.

2. **Retrieve All Products Endpoint:**
    - **Method:** GET
    - **Endpoint:** `/product/get-all-product`
    - **Description:** Retrieves a list of all products.

3. **Retrieve Detailed Product Information Endpoint:**
    - **Method:** GET
    - **Endpoint:** `/product/get-product/:id`
    - **Description:** Retrieves detailed information about a specific product identified by `:id`.

4. **Delete Product and Associated Variants Endpoint:**
    - **Method:** DELETE
    - **Endpoint:** `/product/delete-product/:id`
    - **Description:** Deletes a product and its associated variants identified by `:id`.

5. **Update Product Information Endpoint:**
    - **Method:** PUT
    - **Endpoint:** `/product/update-product/:id`
    - **Description:** Updates the information of a product identified by `:id`.

6. **Add Variants to an Existing Product Endpoint:**
    - **Method:** POST
    - **Endpoint:** `/product/:id/add-variants`
    - **Description:** Adds variants to an existing product identified by `:id`.

7. **Search for Products Endpoint:**
    - **Method:** GET
    - **Endpoint:** `/product/search/:query`
    - **Description:** Searches for products based on the provided search `:query`. Returns a list of products matching the search criteria.

## Architectural Decisions
- The project follows the MVC (Model-View-Controller) architecture.
- Express.js is used as the web application framework.
- MongoDB is used as the database, and Mongoose is used as the ODM (Object Data Modeling) library.
- Endpoints are organized into separate route files for better code organization.
- Controllers handle the business logic and interact with the models.
- Variants are stored as separate documents and linked to products using references.

## Assumptions
- The project assumes that MongoDB is installed and running on the default port.
- The project assumes a basic understanding of RESTful API concepts.

## Instructions
1. Ensure that Node.js and MongoDB are installed.
2. Clone the repository and navigate to the project folder.
3. Install dependencies using `npm install`.
4. Start the server using `node index.js`.
5. Access the API endpoints using a tool like Postman or through a web browser.
