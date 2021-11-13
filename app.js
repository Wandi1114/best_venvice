const express = require('express')
const { file } = require('googleapis/build/src/apis/file')
const app = express()
const port = 3000
var router = require('./router')

app.use(express.json())
// app.use(express.bodyParser())
app.use("/", router)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
