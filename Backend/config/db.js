const mongoose = require('mongoose');
require('dotenv').config();


module.exports = () => {
    mongoose.connect()

    .then(() => {
        console.log('Mongodb connected...');
    })
    .catch(err => console.log(err.message));
};






