const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../controllers/productControllers");

router.get("/", browse);
router.get("/:id", read);
router.post("/", add);
router.delete("/:id", destroy);
router.put("/:id", edit);

module.exports = router;
