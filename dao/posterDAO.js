const db = require('../db');

async function createPoster(title, description, imageUrl, userId) {
    const result = await db.query(
        `INSERT INTO posters (title, description, image_url, created_by)
         VALUES ($1, $2, $3, $4)
         RETURNING id, title, description, image_url, created_by, created_at`,
        [title, description, imageUrl, userId]
    );
    return result.rows[0];
}

async function findAll() {
    const result = await db.query(
        `SELECT p.*, u.email as created_by_email
         FROM posters p
         JOIN users u ON p.created_by = u.id`
    );
    return result.rows;
}

async function findByUser(userId) {
    const result = await db.query(
        `SELECT * FROM posters WHERE created_by = $1`,
        [userId]
    );
    return result.rows;
}

module.exports = { createPoster, findAll, findByUser };
