const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const templates = require('./templates');

// Construct a schema, using GraphQL schema language
// Initialize a GraphQL schema
const schema = buildSchema(`
  type Query {
    template(id: String): Template
    templates: [Template]
  },
  type Template {
    id: String
    name: String
    thumbnail: String
    price: Int
    category: String
    sku: String
    enabled: Boolean
    visible: Boolean
  }
`);

// Return a single user (based on id)
const getTemplate = function(args) {
    const templateId = args.id;
    return templates.filter(template => template.id === templateId)[0];
};

// Return a list of users (takes an optional shark parameter)
const retrieveTemplates = function(args) {
    return templates;
};

// The root provides a resolver function for each API endpoint
// Root resolver
const root = {
    template: getTemplate,  // Resolver function to return user with specific id
    templates: retrieveTemplates
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
