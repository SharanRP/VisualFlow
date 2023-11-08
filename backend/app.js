const express = require("express")
const app = express()
app.use(express.json()) // for parsing application/json
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
const cors = require('cors');
const { default: axios } = require("axios");


app.use(cors());
app.get('/' , (req , res)=>{
    res.send(`Hello World`)
})

app.post("/runCode" ,async (req , res) =>{
    const data = req.body

    const {
        script  ,
        language,
        clientId,
        clientSecret,
        versionIndex,
        stdin
    } = data
    const response = await axios.post('https://api.jdoodle.com/v1/execute' , {
        script: script,
        language:language,
        clientId: clientId,
        clientSecret: clientSecret,
        versionIndex:versionIndex,
        stdin:stdin,
  })
  console.log(response.data)
      res.json({
        data:response.data
      })
})
module.exports = app
