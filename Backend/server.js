const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/project_ark');

const products_routes = require('./routes/productRoutes');

app.listen(5000, () => {
    console.log('server is listening on port 5000')
});

app.use('/products', products_routes);