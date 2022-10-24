const mongoose = require("mongoose");

const {
  Schema,
  Schema: { Types },
} = mongoose;

// Book schema configuration
const bookSchema = new Schema({
  title: {
    type: Types.String,
    default: "",
    trim: true,
  },
  pages: {
    type: Types.Number,
    default: 0,
  },
  author: {
    type: Types.ObjectId,
    ref: "Author",
  },
  publishedAt: {
    type: Types.Date,
    default: Date.now,
  },
  editorial: {
    type: Types.String,
    default: "",
  },
});

module.exports = mongoose.model("Book", bookSchema);
