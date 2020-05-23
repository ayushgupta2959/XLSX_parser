const express = require("express"),
  router = express.Router({ mergeParams: true });

//index routes
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
