const express = require("express");

const UserRouter = express.Router();

const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../controllers/userControllers");

UserRouter.get("/", browse);
UserRouter.get("/:id", read);
UserRouter.post("/", add);
UserRouter.put("/:id", edit);
UserRouter.delete("/:id", destroy);

module.exports = UserRouter;
