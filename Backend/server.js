const express=require( 'express')
 require('./config/db');

const userRoute= require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');





const  app = express();
app.use(express.json());

app.use('/users',userRoute)
app.use('/users' ,productsRoutes)


const port= process.env.PORT ||3000

app.listen(port, ()=>{console.log(`Server is running on ${port}`)})
