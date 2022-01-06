const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User  = require("../models/auth.model");




const login =  async(req,res)=>{

    let {email , password} = req.body ;
    
    try {

        let user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success :false, 
                msg  : "User not exist"
            })
        }
        const passVerify = await bcrypt.compare(password  , user.password);
        if(!passVerify){

            return res.status(401).json({
                success :false ,
                msg  : "Incorrect password",


            })
            
        }

        const populatedData = await User.find({email}, {password:0}).populate("wishlist cart.productId address order.orderedProduct")
        console.log(populatedData)

        const token = generateToken({id : user._id});
            return res.status(200).json({
                success :true,
                msg  : `${user.username}, welcome back`,
                token,
                user : populatedData

            })
        
    } catch (error) {
        res.status(500).json({
            success:false , 
            msg  : error.message,
        })
        
    }
}

const signup = async(req,res)=>{
    let {username, email , password} = req.body ;
    try {

        let  user =  await User.findOne({email});
        if(user){
            return res.status(404).json({
                msg :"User already registered",
                success : false
            })
        }

        password  = await bcrypt.hash(password , 12);

        user = {username, email , password , wishlist :[], cart : [] , order : [] ,address : []}

    
        const newUser = await new User(user);
        

        await newUser.save((err , docs)=>{
            if(err) throw err ;
            const token = generateToken({id  : docs._id})
            
            res.status(200).json({
                success :true ,
                msg : `${username} , you successfully registered` ,
                token,
                
                
            })

        })
        
        
    } catch (error) {

        res.status(500).json({
            success : false,
            msg : error.message
        })
        
    }

}

const generateToken =(payload)=>jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : "1d"});


const AuthActions = {
    login : login,
    signup :signup
}



module.exports = AuthActions