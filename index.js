const { ApolloServer } = require("apollo-server");
const { mergeSchemas } = require("@graphql-tools/schema");
const schemas = require("./schemas");
const resolvers = require("./resolvers");
const connectDB = require("./config/db");

// Método para configurar la conexión con la base de datos de mongo
connectDB();

/**
 * MergeSchemas sirve para unir los schemas con resolvers
 * para que puedan ser pasados al server de graphql
 */
const schema = mergeSchemas({
  schemas,
  resolvers,
});

// Configuración del server
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    /**
     * Aquí se puede interceptar las peticiones para obtener los datos de petición
     * y hacer procesos como autenticación con token y obtener más datos de petición
     */
    return {};
  },
});

// Servidor corriendo en el puerto 4000
server
  .listen({
    port: 4000,
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
