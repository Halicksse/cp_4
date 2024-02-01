const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    if (users.length) {
      res.json(users);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await tables.user.readById(id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  const id = parseInt(req.params.id, 10);

  try {
    const result = await tables.user.update(
      firstname,
      lastname,
      email,
      password,
      id
    );
    if (result === 0) {
      res.status(404).json({ message: "user does not exist" });
    } else {
      res.status(200).json({ message: "user was modified with success" });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const { firstname, lastname, email } = req.body;
  const password = req.body.hashedpwd;
  try {
    const newUser = await tables.user.create(
      firstname,
      lastname,
      email,
      password
    );
    res
      .status(201)
      .json({ id: newUser.insertId, message: "user was created with success" });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tables.user.destroy(id);
    if (result) {
      res.json({ message: "user was deleted with success" });
    } else {
      res.status(404).json({ message: "user does not exist" });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, destroy };
