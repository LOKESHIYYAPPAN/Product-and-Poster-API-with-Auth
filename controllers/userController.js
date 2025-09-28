const authService = require('../services/userService');

async function signup(req, res) {
    try {
        const { email, password, confirmPassword, role } = req.body;

        if (!email) return res.status(400).json({ error: 'Email is required' });
        if (!password) return res.status(400).json({ error: 'Password is required' });
        if (password !== confirmPassword) return res.status(400).json({ error: 'Passwords do not match' });
        if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

        const allowedRoles = ['User', 'Admin', 'Super Admin'];
        console.log(role)
        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({ error: 'Invalid role specified' });
        }

        const { user, token } = await authService.signup(email, password, role);
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function signin(req, res) {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });
        if (!password) return res.status(400).json({ error: 'Password is required' });
        if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
        const { user, token } = await authService.signin(email, password);
        res.json({ user, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function profile(req, res) {
    try {
        const user = await authService.profile(req.user.id);
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to load profile' });
    }
}

async function listUsers(req, res) {
    try {
        const users = await authService.getAllUsers();
        res.json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { signup, signin, profile, listUsers };
