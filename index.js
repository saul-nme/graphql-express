const { ApolloServer } = require("apollo-server");
const { mergeSchemas } = require("@graphql-tools/schema");
const schemas = require("./schemas");
const resolvers = require("./resolvers");
const connectDB = require("./config/db");

// Connect Database
connectDB();

const schema = mergeSchemas({
  schemas,
  resolvers,
});

// Server
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {};
  },
});

server
  .listen({
    port: 4000,
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
