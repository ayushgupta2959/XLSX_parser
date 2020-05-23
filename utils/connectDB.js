const mongoose = require("mongoose");
const uri = process.env.DATABASE_URI;

connectDB = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(
      () => {
        console.log("mongoose connected");
      },
      (err) => {
        console.log("mongoose connection failed => " + err);
      }
    );
};

module.exports = connectDB;
