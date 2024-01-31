const AbstractManager = require("./AbstractManager");

class DetailManager extends AbstractManager {
  constructor() {
    super({ table: "detailedorder" });
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

  async create(quantity, unitPrice) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (quantity, unit_price) values (?, ?)`,
      [quantity, unitPrice]
    );
    return result;
  }

  // The U of CRUD - Update operation

  async update(quantity, unitPrice, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET quantity = ?, unit_price =?  WHERE id = ?`,
      [quantity, unitPrice, id]
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
module.exports = DetailManager;
