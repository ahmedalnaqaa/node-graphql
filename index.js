const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const products = require('./products.json');

// Construct a schema, using GraphQL schema language
// Initialize a GraphQL schema
const schema = buildSchema(`
  type Query {
    product(id: String): Product
    products: [Product]
  },
  type Product {
    sku: String
    name: String
  }
`);

// Return a single user (based on id)
const getProduct = function(args) {
    const productSku = args.sku;
    return products.filter(product => product.sku === productSku)[0];
};

// Return a list of users (takes an optional shark parameter)
const retrieveProducts = function(args) {
    return products;
};

// The root provides a resolver function for each API endpoint
// Root resolver
const root = {
    product: getProduct,  // Resolver function to return user with specific id
    products: retrieveProducts
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
