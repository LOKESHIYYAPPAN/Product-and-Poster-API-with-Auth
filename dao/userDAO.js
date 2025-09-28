const db = require('../db');

async function findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

async function createUser(email, hashedPassword, role = 'User') {
    const result = await db.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at',
        [email, hashedPassword, role]
    );
    return result.rows[0];
}

async function findById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

async function getAllUsers() {
    return await userDao.findAll();
}
module.exports = { findByEmail, createUser, findById, getAllUsers };
