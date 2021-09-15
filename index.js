const express = require('express');
const app = express();


let port = process.env.PORT || 3000;
app.get("/",(req,res)=>{
    res.send("welcome on server")
})

app.get("/product",(req,res)=>{
    res.json({
        name :"amit",
        lastname : "thakur"
    })
})

app.listen(port ,()=>console.log(`server listening on ${port}`))