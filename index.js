const express = require('express');
const data = require("./data")
const app = express();


let port = process.env.PORT || 3000;
app.get("/",(req,res)=>{
    res.send("welcome on server")
})
app.get("/product",(req,res)=>{
    res.json({data})
})

app.listen(port , ()=>`server listening on ${port}`)