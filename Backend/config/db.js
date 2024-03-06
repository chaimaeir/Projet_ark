const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.DATABASE_URL

mongoose.connect(db)
.then(()=>console.log('connected to MongoDB'))
.catch((err)=>{
    console.error("failed to connect to MongoDB", err)
    process.exit(1)});
