const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const URL_DB = `mongodb+srv://${process.env.USR_MONGO}:${process.env.PSW_MONGO}@${process.env.CLUSTER_NAME}.mongodb.net/${process.env.DATA_BASE}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(URL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("Error connecting to database", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
