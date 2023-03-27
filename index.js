const express = require('express')
const app = express()
const port = process.env.PORT||5000
const db= require('./db')
db();
const BASE_URL=process.env.BASE_URL
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/',require('./routes/createuser'))
app.use('/',require('./routes/displaydata'))
app.use('/',require('./routes/orderData'))
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})