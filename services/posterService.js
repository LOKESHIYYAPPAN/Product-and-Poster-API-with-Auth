const posterDao = require('../dao/posterDAO');

async function createPoster(title, description, imageUrl, userId) {
    return await posterDao.createPoster(title, description, imageUrl, userId);
}

async function listPosters(role, userId) {
    if (role === 'Super Admin') return await posterDao.findAll();
    if (role === 'Admin') return await posterDao.findByUser(userId);
    return await posterDao.findAll();
}

module.exports = { createPoster, listPosters };
