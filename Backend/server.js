const express=require( 'express')
require('./config/db');
const userRoute= require('./routes/userRoutes')
const productRoute = require('./routes/productRoutes')





const  app = express();
app.use(express.json());

app.use('/users',userRoute)
app.use('/products',productRoute)

const port= process.env.PORT ||3000

app.listen(port, ()=>{console.log(`Server is running on ${port}`)})