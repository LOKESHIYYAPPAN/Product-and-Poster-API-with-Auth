const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDAO');

const JWT_SECRET = process.env.JWT_SECRET;

async function signup(email, password, role = 'User') {
    const existingUser = await userDao.findByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userDao.createUser(email, hashedPassword, role);

    const token = generateToken(user);
    return { user, token };
}

async function signin(email, password) {
    const user = await userDao.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    const token = generateToken(user);
    return { user: { id: user.id, email: user.email, role: user.role }, token };
}

async function profile(userId) {
    return await userDao.findById(userId);
}

async function getAllUsers() {
    return await userDao.getAllUsers();
}

function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

module.exports = { signup, signin, profile, getAllUsers };
