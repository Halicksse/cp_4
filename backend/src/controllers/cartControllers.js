const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const cart = await tables.cart.readAll();
    if (cart.length) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await tables.cart.readById(id);
    if (cart == null) {
      res.sendStatus(404);
    } else {
      res.json(cart);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const { quantity } = req.body;
  const id = parseInt(req.params.id, 10);

  try {
    const result = await tables.cart.update(quantity, id);
    if (result === 0) {
      res.status(404).json({ message: "cart does not exist" });
    } else {
      res.status(200).json({ message: "cart was modified with success" });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const { quantity } = req.body;
  try {
    const newCart = await tables.cart.create(quantity);
    res
      .status(201)
      .json({ id: newCart.insertId, message: "cart was created with success" });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tables.cart.destroy(id);
    if (result) {
      res.json({ message: "cart was deleted with success" });
    } else {
      res.status(404).json({ message: "cart does not exist" });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, destroy };
