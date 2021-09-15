const mongoose = require('mongoose');

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        },(err)=>{
            if(err) throw err ;
            console.log("database connected")
        })

        
        
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = dbConnect