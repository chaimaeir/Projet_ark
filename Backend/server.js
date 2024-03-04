const express=require( 'express')
const database=require('./config/db')
require('dotenv').config()

const userRoute= require('./routes/userRoutes')
const  app = express();
app.use(express.json())
app.use('/users',userRoute)

const port=process.env.PORT

app.listen(port, ()=>{console.log(`Server is running on ${port}`)})