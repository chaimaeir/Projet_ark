const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const productRoute = require('./routes/productRoutes');
require('./config/db');

app.use(express.json());

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});

app.use('/products', productRoute);