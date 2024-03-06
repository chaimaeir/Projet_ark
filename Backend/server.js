const express = require('express');
const database = require ('./config/db');
const mongoose = require('mongoose');
const createError = require('http-errors');
const dotenv = require('dotenv').config()  

console.log(dotenv.parsed);

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}));

// Initialize DB
require('./config/db')();

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

//404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not found'))
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('server started on port ' + PORT + '...');
});