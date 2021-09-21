
const User = require("../models/auth.model");
const Product = require("../models/product.model");
const {extend} = require('lodash')
const getResponse = require("./utils");


const getUser =async(req,res)=>{
    try{
        const user = req.user;
        const findUser = await User.findById(user.id,{password : 0});
        
        if(!findUser){
            return getResponse(res,400,"user not exist")
        }
        const userData = await findUser.populate("wishlist cart.productId address order");
        
        getResponse(res,200,"ready to shop",userData)
    }
    catch(error){
        console.log(error.message)
        getResponse(res,500,error.message)
    }
}
const getWishlist = async(req,res)=>{
    try {
        const user = req.user ;
        const findUser = await User.findById(user.id);
        if(!findUser){
            return getResponse(res,400,"user not exist")
        }
            
        const populateData = await findUser.populate("wishlist");
        getResponse(res,200,"wishlist sucessfully fetched",populateData)
        
    } catch (error) {
        getResponse(res,500,error.message)
        
    }
   

}

const addToWishlist = async(req,res)=>{

    try {
        const user = req.user ;
        const product_id  = req.params;
        console.log(product_id)
        const findUser = await User.findById(user.id);
        if(!findUser){

            return getResponse(res,400,"user not exist")
            
        }

        const checkDuplicate = await findUser.wishlist.find(item => item._id == product_id.id)

        if(checkDuplicate){
            return getResponse(res,400,"product already exist")
        }

        const findProduct = await Product.findById(product_id.id);
        

        if(!findProduct){
            return getResponse(res,400,"product not available")
           

        }
        
        findUser.wishlist.push({_id : findProduct.id});
        const popdata = await findUser.populate('wishlist')

        await findUser.save((err,docs)=>{
            if(err)throw err ;
            return getResponse(res,200,"product added", popdata)

        })



    
    }
    catch (error) {
        getResponse(res,500,error.message)
        
    }

}


const removeFromWishlist = async(req,res)=>{
    const product = req.params
    console.log(product)
    const user = req.user ;
    try {

        const findUser = await User.findById(user.id);
        if(!findUser){
            return getResponse(res,400,"user not exist")
        }


        const findProduct = await findUser.wishlist.find(item => item._id == product.id)
        console.log(findProduct)

        
        if(!findProduct){

            return res.status(400).json({
                success :false,
                msg :"product unavailable"
            })
        }
        await findUser.wishlist.pull({ _id: findProduct._id });
        await findUser.save();
        return getResponse(res,200,"successfully removed", findUser.wishlist)


        
    } catch (error) {
        getResponse(res,500,error.message)
        
    }

}



const addToCart = async (req,res)=>{
    try {
        const productId = req.params;
        const user = req.user;
        const updateProduct = req.body
        
        
        // res.json({product , id : user.id});

        const findUser = await User.findById(user.id);
        if(!findUser){
            return getResponse(res,400,"user not exist")

        }        
        const findProduct = await Product.findById(productId.id);
        
        const checkDuplicate =  await findUser.cart.find(product => product.productId == productId.id )
        
        if(checkDuplicate){
            const newProduct = extend(checkDuplicate , updateProduct)
            await findUser.save()
            const updateCart = await findUser.populate('cart.productId')
            return  getResponse(res,200,"quantity updated", updateCart)
            

            
        }

        await findUser.cart.push({productId : findProduct.id , qty : 1})
        await findUser.save()
        const updateCart = await findUser.populate('cart.productId')
        getResponse(res,200,"product added",updateCart)

        
        


        
    } catch (error) {

        getResponse(res,500,error.message)
        
    }

}

const removeFromCart = async(req,res)=>{
    try {
        const productId = req.params;
        const user = req.user;

        const findUser = await User.findById(user.id);
        if(!findUser){
            return getResponse(res,400,"user not exist")
        }
        const findProduct = await Product.findById(productId.id);
        if(!findProduct){
            return getResponse(res,400,"user not exist")
        }


        const cartProduct = await findUser.cart.find(product => product.productId == productId.id);
        console.log(cartProduct)
        await findUser.cart.pull(cartProduct._id)
        await findUser.save()
        const populateData = await findUser.populate('cart.prouctId')
        getResponse(res,200,"product removed" , populateData)


        
    } catch (error) {

        getResponse(res,500,error.message)
        
    }


}


const addAddress = async(req,res)=>{
    try {
        const user = req.user;
    const {address} = req.body;
    
    const findUser = await User.findById(user.id);
    if(!findUser){
        return getResponse(res,400,"user not exist")
    }
    
    await findUser.address.push(address);
    await findUser.save();
    getResponse(res,200,"address added", findUser)
    
    } catch (error) {
        getResponse(res,500,error.message)
        
    }
}

const removeAddress = async(req,res)=>{
    const user = req.user
    const {address_id} = req.params;

    const findUser = await User.findById(user.id);
    if(!findUser){
        return getResponse(res,400,"user not exist")
    }

    const findAddress = await findUser.address.find(address => address.id === address_id);
    if(!findAddress){
        return getResponse(res,400,"address not exist")
    }
    await findUser.address.pull({_id :findAddress.id})
    await findUser.save()
    getResponse(res,200,"address removed",findUser.address)
    
}
const updateAddress = async(req,res)=>{
    try {
        const user = req.user
    const {address_id} = req.params;
    const {newAddress} = req.body
    console.log(newAddress)

    const findUser = await User.findById(user.id);
    if(!findUser){
        return getResponse(res,400,"user not exist")
    }
    const findAddress = await findUser.address.find(address => address.id === address_id);

    if(!findAddress){
        return getResponse(res,400,"address not exist")
    }

    const updateAddress = extend(findAddress,newAddress);
    console.log(updateAddress)
    await findUser.save()
    getResponse(res,200,"address updated successfully",findAddress)
        
    } catch (error) {
        getResponse(res,500,error.message)
        
    }

}





const userAction = {
    getUser,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
    addAddress,
    removeAddress,
    updateAddress,


}
module.exports = userAction
