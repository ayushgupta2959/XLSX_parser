const express = require("express"),
  path = require("path"),
  multer = require("multer"),
  router = express.Router({ mergeParams: true }),
  xlsx = require("xlsx"),
  generateSchema = require("generate-schema"),
  mongoose = require("mongoose");

//multer setup
const file_upload_path = path.join(process.env.root_path, "uploads");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, file_upload_path);
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  onError: (err, next) => {
    console.log("error" + err);
    res.redirect("/");
  },
}).single("file");

//Restful APIs on collections
router.get("/collections", (req, res) => {
  mongoose.connection.db.listCollections().toArray(function (err, collections) {
    if (err) {
      res.json({ error: "error encountered can't fetch collections" });
    }
    let collectionsName = collections.map((collection) => collection.name);
    res.json({ collectionsName: collectionsName });
  });
});

router.post("/collections", upload, (req, res) => {
  if (req.file) {
    const file_name = req.file.filename;
    if (!(file_name.endsWith(".xlsx") || file_name.endsWith(".csv"))) {
      res.json({ error: "only xlsx and csv filed to be uploaded" });
    }
    const file_path = path.join(file_upload_path, req.file.filename);
    const workbook = xlsx.readFile(file_path);
    const sheet_name_list = workbook.SheetNames;
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    const dyn_schema = generateSchema.mongoose(rows);

    if (dyn_schema["0"]) {
      for (key in dyn_schema["0"]) {
        dyn_schema["0"][key]["type"] = "String";
      }
      const Data = mongoose.model(file_name, dyn_schema["0"]);
      Data.insertMany(rows, (err, docs) => {
        if (err) {
          res.json({ error: err });
        }
        res.json({ message: "file successfully added to database" });
      });
    } else {
      res.json({ error: "No schema detected." });
    }
  } else {
    res.json({ error: "No file found" });
  }
});

router.delete("/collections/:collection_name", (req, res) => {
  // console.log(req.params.collection_name);
  mongoose.connection.db.dropCollection(
    req.params.collection_name,
    (err, result) => {
      if (err) {
        res.json({ error: "error encountered can't fetch collections" });
      }
      res.json({
        message:
          "successfully removed collection " + req.params.collection_name,
      });
    }
  );
});

module.exports = router;
