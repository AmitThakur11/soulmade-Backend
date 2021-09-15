
const Product  = require("../models/product.model")


const getProduct = async(req,res)=>{
    try {
        const product = await Product.find({})
        if(!product){
            return res.status(400).json({
                success : false , 
                msg : "no products available right now"
            })
        }
        res.status(200).json({
            success : true,
            msg :"data fetched successfully",
            product

        })
        
    } catch (error) {
        res.status(500).json({
            success :false,
            msg : error.message
        })
    }

}
const addProduct = async(req,res)=>{

    try {
        const product = req.body;
        const newProduct = await new Product(product);
        await newProduct.save((err,docs)=>{
            if(err) throw err ;
            res.status(200).json({
                success : true,
                msg :"product added"
            })
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            msg :error.message

        })
    }

}




const productAction = {

    getProduct : getProduct,

    addProduct : addProduct

}

module.exports = productAction