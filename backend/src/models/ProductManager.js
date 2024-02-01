const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  constructor() {
    super({ table: "product" });
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

  async create(name, description, price) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} ( name, description, price ) values (?, ?, ?)`,
      [name, description, price]
    );
    return result;
  }

  // The U of CRUD - Update operation

  async update(name, description, price, stock, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, description =?, price = ?  WHERE id = ?`,
      [name, description, price, id]
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

module.exports = ProductManager;
