const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

const port = process.env.PORT||5000;
require('dotenv').config()

// middleware
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'https://bookify-front.vercel.app'],
    credentials: true
}))

//routes

const bookRoutes = require('./src/books/book.route')
const userRoutes = require('./src/users/user.route')
const orderRoutes = require('./src/orders/order.route');
// const Wishlist = require('./src/wishlist/wishlist.model');
const wishlist = require('./src/wishlist/wishlist.route')

async function main(){
    await mongoose.connect(process.env.DB_URL);
    app.use('/',(req,res)=>{
        res.send("Server Ready");
    
    })
}


main().then(()=> console.log("MongoDB connected")).catch(err=> console.log(err));

app.use("/api/books", bookRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/wishlist", wishlist)

app.listen(port, (err, res) => {
    console.log('listening on port '+ port);
})