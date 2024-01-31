const AbstractManager = require("./AbstractManager");

class CartManager extends AbstractManager {
  constructor() {
    super({ table: "cart" });
  }
  // The Rs of CRUD - Read operations

  async readAll() {
    const [rows] = await this.database.query(`SELECT * from ${this.table}`);
    return rows;
  }

  async readById(id) {
    const [rows] = await this.database.query(
      `SELECT * from ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  // The C of CRUD - Create operation

  async create(quantity) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (quantity) values (?)`,
      [quantity]
    );
    return result;
  }

  // The U of CRUD - Update operation

  async update(quantity, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET quantity = ?  WHERE id = ?`,
      [quantity, id]
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation

  async destroy(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = CartManager;
