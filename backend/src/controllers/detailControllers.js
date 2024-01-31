const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const detailedOrder = await tables.detailedorder.readAll();
    if (detailedOrder.length) {
      res.json(detailedOrder);
    } else {
      res.status(404).json({ message: "detailed order not found" });
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detailedOrder = await tables.detailedorder.readById(id);
    if (detailedOrder == null) {
      res.sendStatus(404);
    } else {
      res.json(detailedOrder);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const { quantity, unit_price: unitPrice } = req.body;
  const id = parseInt(req.params.id, 10);

  try {
    const result = await tables.detailedorder.update(quantity, unitPrice, id);
    if (result === 0) {
      res.status(404).json({ message: "detailed order does not exist" });
    } else {
      res
        .status(200)
        .json({ message: "detailed order was modified with success" });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const { quantity, unit_price: unitPrice } = req.body;
  try {
    const newDetailedOrder = await tables.detailedorder.create(
      quantity,
      unitPrice
    );
    res.status(201).json({
      id: newDetailedOrder.insertId,
      message: "detailed order was created with success",
    });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tables.detailedorder.destroy(id);
    if (result) {
      res.json({ message: "detailed order was deleted with success" });
    } else {
      res.status(404).json({ message: "detailed order does not exist" });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, destroy };
