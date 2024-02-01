const express = require("express");

const UserRouter = express.Router();
const verifyToken = require("../middlewares/auth");

const hash = require("../middlewares/hashPassword");

const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../controllers/userControllers");

UserRouter.get("/", browse);
UserRouter.get("/:id", read);
UserRouter.post("/", hash, add);
UserRouter.put("/:id", verifyToken, hash, edit);
UserRouter.delete("/:id", destroy);

module.exports = UserRouter;
