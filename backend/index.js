const express = require('express');

const app = express();

const port = process.env.PORT || 5000;


//routes
app.use('/',(req,res)=>{
    res.send("Server Ready");

})

app.listen(port, (err, res) => {
    console.log('listening on port '+ port);
})