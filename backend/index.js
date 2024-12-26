const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

const port = process.env.PORT||5000;
require('dotenv').config()

// middleware
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

//routes

const bookRoutes = require('./src/books/book.route')
app.use("/api/books", bookRoutes)

async function main(){
    await mongoose.connect(process.env.DB_URL);
    app.use('/',(req,res)=>{
        res.send("Server Ready");
    
    })
}

main().then(()=> console.log("MongDB connected")).catch(err=> console.log(err));

app.listen(port, (err, res) => {
    console.log('listening on port '+ port);
})