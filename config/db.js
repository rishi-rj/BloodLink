const mongoose = require("mongoose");
const colors = require("colors");
MONGO_URL = "mongodb://127.0.0.1:27017"
const connectDB = async () => {
  try { 
    await mongoose.connect(MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
