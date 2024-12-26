const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT;
require('dotenv').config()


//routes


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