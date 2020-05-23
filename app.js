const express = require("express"),
  app = express(),
  connectDB = require("./utils/connectDB");

const PORT = process.env.PORT || 2959;
process.env.root_path = __dirname;

connectDB();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const indexRoutes = require("./routes/index");
const collectionRoutes = require("./routes/api/collections");
app.use("/", indexRoutes);
app.use("/", collectionRoutes);

app.listen(PORT, () => {
  console.log("Server started");
});
