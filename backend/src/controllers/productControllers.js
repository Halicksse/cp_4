const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const products = await tables.product.readAll();
    if (products.length) {
      res.json(products);
    } else {
      res.status(404).json({
        message: "no products found",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const read = async (req, res, next) => {
  try {
    const product = await tables.product.readById(req.params.id);
    if (product === null) {
      res.status(404).json({
        message: "unknow id",
      });
    } else {
      res.json(product);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { name, description, price, stock } = req.body;
  try {
    const newProduct = await tables.user.create(
      name,
      description,
      price,
      stock
    );
    res.status(201).json({
      id: newProduct.insertId,
      message: "user was created with success",
    });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { name, description, price, stock } = req.body;
  const id = parseInt(req.params.id, 10);

  try {
    const result = await tables.product.update(
      name,
      description,
      price,
      stock,
      id
    );
    if (result === 0) {
      res.status(404).json({ message: "product does not exist" });
    } else {
      res.status(200).json({ message: "product was modified with success" });
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tables.category.delete(id);
    if (result) {
      res.json({
        message: `product deleted on id = ${id}`,
      });
    } else {
      res.status(404).json({
        message: "id not found",
      });
    }
  } catch (e) {
    console.error(e);
  }
};
module.exports = { browse, read, add, edit, destroy };
