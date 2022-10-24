const mongoose = require("mongoose");

const {
  Schema,
  Schema: { Types },
} = mongoose;

const authorSchema = new Schema({
  firstName: {
    type: Types.String,
    default: "",
    trim: true,
  },
  lastName: {
    type: Types.String,
    default: "",
    trim: true,
  },
  age: {
    type: Types.Number,
    default: 0,
  },
  books: {
    type: [Types.ObjectId],
    default: [],
    ref: "Book",
  },
});

module.exports = mongoose.model("Author", authorSchema);
