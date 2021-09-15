const jwt = require('jsonwebtoken');


const authVerify = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const user   = jwt.verify(token , process.env.JWT_SECRET);
        req.user = user;
        console.log(user)
        next()

    } catch (error) {

        res.status(400).json({
            success :false ,
            msg : "token invalid please login"
        })
        
    }

}

module.exports = authVerify