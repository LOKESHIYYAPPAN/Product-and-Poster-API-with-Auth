const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const posterRoutes = require('./routes/posterRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes)
app.use('/posters', posterRoutes);

module.exports = app;
