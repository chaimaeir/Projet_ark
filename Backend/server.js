const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
app.use(express.json());


mongoose.connect('mongodb+srv://kadiroumaima:OUMSdreams19@cluster0.zafxu7g.mongodb.net/');

const products_routes = require('./routes/productRoutes');

app.listen(5000, () => {
    console.log('server is listening on port 5000')
});

app.use('/products', products_routes);