const { ApolloError } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const lodash = require("lodash");
const Author = require("../models/Author");
const Book = require("../models/Book");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  parseValue: (value) => new Date(value),
});

/**
 * Aquí se define dateScalar es una configuración especial
 * para que grahphql pueda transformar la fecha a una iso date
 * ya que por default regresa la fecha tipo Unix Timestamp por ejemplo 1360013296
 * después de eso en el objeto resolvers define la propiedad Date: dateScalar
 * ya con esto en todos los resolvers que regrese un date ya esté formateado
 */
const resolvers = {
  Date: dateScalar,
  /**
   * Es necesario que los query que se definieron en los esquemas se definan aquí
   * con el mismo nombre y en el mismo apartado las query en Query y los mutation en Mutation
   */
  Query: {
    /**
     * Tanto en los query como mutations se define como una función pero recibe 4 parámetros
     * 1: parent - Regresa el valor del resolver
     * 2: args - Es el objeto con los parámetros que se definen en el query o mutation
     * 3: context - Un objeto compartido entre todos los solucionadores que se ejecutan para una operación en particular. Use esto para compartir el estado por operación, incluida la información de autenticación, las instancias del cargador de datos y cualquier otra cosa para rastrear entre los resolutores.
     * 4: info - Contiene información sobre el estado de ejecución de la operación, incluido el nombre del campo, la ruta al campo desde la raíz y más.
     */
    getAuthors: async () => {
      try {
        const authors = await Author.find({})
          .populate("books", "title pages publishedAt editorial", Book)
          .lean();
        return authors;
      } catch (error) {
        return new ApolloError("Ha ocurrido un error inesperado");
      }
    },
    getAuthorById: async (_, { id }) => {
      try {
        const authorDB = await Author.findById(id)
          .populate("books", "title pages publishedAt editorial", Book)
          .lean();
        return authorDB;
      } catch (error) {
        return new ApolloError("Ha ocurrido un error inesperado");
      }
    },
    getBooks: async () => {
      try {
        const books = await Book.find({})
          .populate("author", "firstName lastName age", Author)
          .lean();

        return books;
      } catch (error) {
        return new ApolloError("Ha ocurrido un error inesperado");
      }
    },
    getBookById: async (_, { id }) => {
      try {
        const books = await Book.findById(id)
          .populate("author", "firstName lastName age", Author)
          .lean();
        return books;
      } catch (error) {
        return new ApolloError("Ha ocurrido un error inesperado");
      }
    },
  },
  Mutation: {
    createAuthor: async (_, { input }) => {
      try {
        const body = lodash.pick(input, ["firstName", "lastName", "age"]);
        const authorToSave = new Author(body);

        const newAuthor = await authorToSave.save();
        return newAuthor;
      } catch (error) {
        return new ApolloError("Ha ocurrido un error inesperado");
      }
    },
    updateAuthor: async (_, { id, input }) => {
      try {
        const body = lodash.pick(input, ["firstName", "lastName", "age"]);

        const authorDB = Author.findByIdAndUpdate(
          id,
          { $set: body },
          { new: true }
        ).populate("books", "title pages publishedAt editorial", Book);

        return authorDB;
      } catch (error) {
        return new ApolloError("Ha ocurrido un error inesperado");
      }
    },
    createBook: async (_, { input }) => {
      try {
        const body = lodash.pick(input, [
          "title",
          "pages",
          "author",
          "publishedAt",
          "editorial",
        ]);

        const bookToSave = new Book(body);

        const newBook = await bookToSave.save();
        const [bookSaved] = await Promise.all([
          Book.findById(newBook._id)
            .populate("author", "firstName lastName age", Author)
            .lean(),
          Author.findByIdAndUpdate(body.author, {
            $push: { books: newBook._id },
          }),
        ]);
        return bookSaved;
      } catch (error) {
        return new ApolloError("Ha ocurrido un error inesperado");
      }
    },
    updateBook: async (_, { id, input }) => {
      try {
        const body = lodash.pick(input, [
          "title",
          "pages",
          "publishedAt",
          "editorial",
        ]);

        const bookToSave = Book.findByIdAndUpdate(
          id,
          { $set: body },
          { new: true }
        ).populate("author", "firstName lastName age", Author);

        return bookToSave;
      } catch (error) {
        return new ApolloError("Ha ocurrido un error inesperado");
      }
    },
  },
};

module.exports = resolvers;
