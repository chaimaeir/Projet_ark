const express=require( 'express')
const database=require('./config/db')
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config()
const userRoute= require('./routes/userRoutes')
const authRouter=require("./routes/authRoutes")
const productRoute = require('./routes/productRoutes')

const  app = express();
app.use(express.json())

app.use('/users',userRoute);
app.use('/products',productRoute);
app.use('/',authRouter);

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: new session.MemoryStore(),
}));
app.use(passport.initialize());
app.use(passport.session());


const port=process.env.PORT 


app.listen(port, ()=>{console.log(`Server is running on ${port}`)})