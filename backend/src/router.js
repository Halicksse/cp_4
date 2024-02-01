const express = require("express");

const router = express.Router();

const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const detailRouter = require("./routers/detailRouter");
const cartRouter = require("./routers/cartRouter");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/detail", detailRouter);
router.use("/cart", cartRouter);

const loginRouter = require("./routers/authRouter");

router.use("/login", loginRouter);

module.exports = router;
