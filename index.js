const express = require('express')
const app = express()
const port = process.env.PORT||5000
const db= require('./db')
db();
const BASE_URL=process.env.BASE_URL
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next)=>{
   const allowedOrigins = ['https://grand-trifle-c397e8.netlify.app', 'http://localhost:3000','https://642da8db72c4c80aefcfaa69--graceful-fudge-57ecc2.netlify.app','https://graceful-fudge-57ecc2.netlify.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
//   res.setHeader("Access-Control-Allow-Origin","https://grand-trifle-c397e8.netlify.app");
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
app.use('/',require('./routes/OrderData'))
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
