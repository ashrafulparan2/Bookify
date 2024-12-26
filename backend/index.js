const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

app.use('/', (req, res) => {
  res.send('Welcome to my server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})