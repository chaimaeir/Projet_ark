const express=require( 'express')
const connectDB = require('./config/db');

const userRoute= require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
// Connect to MongoDB
connectDB();



const  app = express();
app.use(express.json());

app.use('/users',userRoute)
app.use('/users' ,productsRoutes)


const port= process.env.PORT ||3000

app.listen(port, ()=>{console.log(`Server is running on ${port}`)})
