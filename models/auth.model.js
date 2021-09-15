const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required:true

    },
    email : {
        type : String,
        unique : true,
    },
    password :{
        type : String ,
        required : true
    },
    wishlist :[
         { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  
    ],
    address : [
        {
            _id: {type : mongoose.Schema.Types.ObjectId,ref : 'Address'},
        }
    ],
    cart:[
        {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
        qty: Number
      }
    ],
    order :[
        { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

    
    ],
    address : 
        [{
            name : {
                type : String,
                required : true
            },
            phoneNo :  {
                type:String,
                requird: true
            },
            appartment : {
                type: String,
                required : true
        
            },
            city : {
                type : String,
                required : true,
            },
            state : {
                type : String ,
                required : true
            },
            postalCode : {
                type : Number,
                required : true
            },
            isDefault :{
                type :  Boolean,
                default: false

            }
        
        }]
    



})

const User =  mongoose.model('User', userSchema );


module.exports = User