
const Product  = require("../models/product.model")


const getProduct = async(req,res)=>{
    try {
        const product = await Product.find({})
        if(!product){
            return res.status(400).json({
                success : false , 
                msg : "No products available right now"
            })
        }
        res.status(200).json({
            success : true,
            msg :"Data fetched successfully",
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
                msg :"Product added"
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