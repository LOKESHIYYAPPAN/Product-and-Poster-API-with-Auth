const posterService = require('../services/posterService');

async function createPoster(req, res) {
    try {
        const { title, description, imageUrl } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const poster = await posterService.createPoster(
            title,
            description,
            imageUrl,
            req.user.id
        );

        res.status(201).json({ poster });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function listPosters(req, res) {
    try {
        const posters = await posterService.listPosters(req.user.role, req.user.id);
        res.json({ posters });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createPoster, listPosters };
