const db = require('../db');

async function createProduct(name, description, price, userId) {
    const result = await db.query(
        `INSERT INTO products (name, description, price, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, description, price, created_by, created_at`,
        [name, description, price, userId]
    );
    return result.rows[0];
}

async function findAll() {
    const result = await db.query(
        `SELECT p.*, u.email as created_by_email
     FROM products p
     JOIN users u ON p.created_by = u.id`
    );
    return result.rows;
}

async function findByUser(userId) {
    const result = await db.query(`SELECT * FROM products WHERE created_by = $1`, [userId]);
    return result.rows;
}

module.exports = { createProduct, findAll, findByUser };
