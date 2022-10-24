const { gql } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { addMocksToSchema } = require("@graphql-tools/mock");

// Schema definition

/**
 * Se puede comentar los campos con """ """ antes de la definición
 * Cuando se requiere in campo obligatirio se agrega el signo ! al final
 * de la definición del tipo del campo por ejemplo title: String!
 */
const typeDefs = gql`
  scalar Date

  """
  Book type
  """
  type Book {
    """
    ID of the book test
    """
    _id: ID
    """
    Title of the book
    """
    title: String
    pages: Int
    author: Author
    publishedAt: Date
    editorial: String
  }

  type Author {
    _id: ID
    firstName: String
    lastName: String
    age: Int
    books: [Book]
  }

  input AuthorInput {
    firstName: String!
    lastName: String!
    age: Int
  }

  input BookInput {
    title: String!
    pages: Int
    author: ID!
    publishedAt: Date
    editorial: String
  }

  input UpdateBookInput {
    title: String
    pages: Int
    publishedAt: Date
    editorial: String
  }

  type Query {
    getAuthors: [Author]
    getAuthorById(id: ID!): Author
    getBooks: [Book]
    getBookById(id: ID!): Book
  }

  type Mutation {
    createAuthor(input: AuthorInput): Author
    updateAuthor(id: ID!, input: AuthorInput): Author
    createBook(input: BookInput): Book
    updateBook(id: ID!, input: UpdateBookInput): Book
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
});

addMocksToSchema({ schema });

module.exports = schema;
