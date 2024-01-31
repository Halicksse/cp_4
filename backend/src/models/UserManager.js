const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
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

  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `SELECT * from ${this.table} WHERE email=?`,
      [email]
    );
    return rows[0];
  }
  // The C of CRUD - Create operation

  async create(firstname, lastname, email, password) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, password) values (?, ?, ?, ?)`,
      [firstname, lastname, email, password]
    );
    return result;
  }

  // The U of CRUD - Update operation

  async update(firstname, lastname, email, password, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?,  lastname = ?, email = ?, password =?  WHERE id = ?`,
      [firstname, lastname, email, password, id]
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
module.exports = UserManager;
