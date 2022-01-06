
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
        const userData = await findUser.populate("wishlist cart.productId address order.orderedProduct");
        
        getResponse(res,200,"ready to shop",userData)
    }
    catch(error){
  
        getResponse(res,500,error.message)
    }
}
const getWishlist = async(req,res)=>{
    try {
        const user = req.user ;
        const findUser = await User.findById(user.id);
        // if(!findUser){
        //     return getResponse(res,400,"User not exist")
        // }
            
        const populateData = await findUser.populate("wishlist");
        getResponse(res,200,"Wishlist successfully fetched",populateData)
        
    } catch (error) {
        getResponse(res,500,error.message)
        
    }
   

}

const addToWishlist = async(req,res)=>{

    try {
        const user = req.user ;
        const product_id  = req.params;
       
        const findUser = await User.findById(user.id);
        // if(!findUser){

        //     return getResponse(res,400,"User not exist")
            
        // }

        const checkDuplicate = await findUser.wishlist.find(item => item._id == product_id.id)

        if(checkDuplicate){
            return getResponse(res,400,"Product removed")
        }

        const findProduct = await Product.findById(product_id.id);
        

        // if(!findProduct){
        //     return getResponse(res,400,"product not available")
           

        // }
        
        findUser.wishlist.push({_id : findProduct.id});
        const {wishlist} = await findUser.populate('wishlist')

        await findUser.save((err,docs)=>{
            if(err)throw err ;
            return getResponse(res,200,"Product added",{wishlist : wishlist})

        })



    
    }
    catch (error) {
        getResponse(res,500,error.message)
        
    }

}


const removeFromWishlist = async(req,res)=>{
    const product = req.params

    const user = req.user ;
    try {

        const findUser = await User.findById(user.id);
        // if(!findUser){
        //     return getResponse(res,400,"user not exist")
        // }


        const findProduct = await findUser.wishlist.find(item => item._id == product.id)        
        // if(!findProduct){

        //     return res.status(400).json({
        //         success :false,
        //         msg :"Product unavailable"
        //     })
        // }
        await findUser.wishlist.pull({ _id: findProduct._id });
        await findUser.save();
        const {wishlist} = await findUser.populate("wishlist");
        
        return getResponse(res,200,"Product removed",{wishlist : wishlist})


        
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
        // if(!findUser){
        //     return getResponse(res,400,"user not exist")

        // }        
        const findProduct = await Product.findById(productId.id);
        
        
        const checkDuplicate =  await findUser.cart.find(product => product.productId == productId.id )
        
        if(checkDuplicate){
            const newProduct = extend(checkDuplicate , updateProduct)
            await findUser.save()
            const updateCart = await findUser.populate('cart.productId')
            return  getResponse(res,200,"Quantity updated", updateCart)
            

            
        }

        await findUser.cart.push({productId : findProduct.id , qty : 1})
        await findUser.save()
        const updateCart = await findUser.populate('cart.productId')
        getResponse(res,200,"Product added",updateCart)

        
        


        
    } catch (error) {

        getResponse(res,500,error.message)
        
    }

}

const removeCart = async(req,res)=>{
    try{
    const user = req.user;
    const findUser = await User.findById(user.id);
    // if(!findUser){
    //     return getResponse(res,401,"user no found")
    // }

    findUser.cart =[]
    await findUser.save((err,docs)=>{
        if(err) throw err
        getResponse(res,200,"Cart cleared", docs.cart)
    });
    }
    catch(error){
        getResponse(res,500,error.message)

    }
    

}




const removeFromCart = async(req,res)=>{
    try {
        const productId = req.params;
        const user = req.user;

        const findUser = await User.findById(user.id);
        // if(!findUser){
        //     return getResponse(res,400,"user not exist")
        // }
        // const findProduct = await Product.findById(productId.id);
        // if(!findProduct){
        //     return getResponse(res,400,"user not exist")
        // }


        const cartProduct = await findUser.cart.find(product => product.productId == productId.id);
        await findUser.cart.pull(cartProduct._id)
        await findUser.save()
        const populateData = await findUser.populate('cart.productId')
        getResponse(res,200,"Product removed" , populateData)


        
    } catch (error) {

        getResponse(res,500,error.message)
        
    }


}


const incrementQty = async(req,res)=>{
    try{

        const productId = req.params;
        const user = req.user;
        const {payload} = req.body

        let findUser = await User.findById(user.id);
        // if(!findUser){
        //     return getResponse(res,400,"user not exist")
        // }
        // const findProduct = await Product.findById(productId.id);
        // if(!findProduct){
        //     return getResponse(res,400,"product not exist")
        // }
   

        let cartProduct = await findUser.cart.find(product => product.productId == productId.id);
        var updateProduct 
        if(payload == "increment"){
             updateProduct = {...cartProduct,qty : cartProduct.qty + 1}
        }
        if(payload == "decrement"){
            updateProduct = {...cartProduct,qty : cartProduct.qty - 1}
        }
        
        cartProduct = extend(cartProduct,updateProduct);
        await findUser.save();
        const populatedData = await findUser.populate("cart.productId");
        getResponse(res,200," Quantity updated" , populatedData.cart)

    }catch(err){
        getResponse(res,500,err.message)
    }
}


const addAddress = async(req,res)=>{
    try {
        const user = req.user;
    const {address} = req.body;
    
    const findUser = await User.findById(user.id);
    // if(!findUser){
    //     return getResponse(res,400,"user not exist")
    // }
    
    await findUser.address.push(address);
    await findUser.save();
    getResponse(res,200,"Address added", findUser.address)
    
    } catch (error) {
        getResponse(res,500,error.message)
        
    }
}

const removeAddress = async(req,res)=>{
    const user = req.user
    const {address_id} = req.params;

    const findUser = await User.findById(user.id);
    // if(!findUser){
    //     return getResponse(res,400,"user not exist")
    // }

    const findAddress = await findUser.address.find(address => address.id === address_id);
    if(!findAddress){
        return getResponse(res,400,"Address not exist")
    }
    await findUser.address.pull({_id :findAddress.id})
    await findUser.save()
    getResponse(res,200,"Address removed",findUser.address)
    
}
const updateAddress = async(req,res)=>{
    try {
        const user = req.user
    const {address_id} = req.params;
    const {newAddress} = req.body


    const findUser = await User.findById(user.id);
    // if(!findUser){
    //     return getResponse(res,400,"user not exist")
    // }
    const findAddress = await findUser.address.find(address => address.id === address_id);

    if(!findAddress){
        return getResponse(res,400,"address not exist")
    }

    const updateAddress = extend(findAddress,newAddress);

    await findUser.save()
    getResponse(res,200,"Address updated",findUser)
        
    }catch(error) {
        getResponse(res,500,error.message)
        
    }

}

const addOrder = async(req,res)=>{
    try{
        const user = req.user 
        const {orderedProduct, address} = req.body
        const findUser = await User.findById(user.id);
        // if(!findUser){
        //     return getResponse(res,400,"user not exist")
        // }

        await findUser.order.unshift({orderedProduct : [...orderedProduct] , address : address});
        findUser.cart = []
        await findUser.save(async (err,docs)=>{
            if(err)throw err;
            const populatedData = await docs.populate("order.orderedProduct")
            getResponse(res,200,"Order updated",populatedData.order)
        })

        
    }catch(err){
        getResponse(res,500,err.message)

    }
}

const cancelOrder = async(req,res)=>{
    try{
        const user = req.user
        const orderId = req.orderId
        const findUser = await User.findById(user.id);
        
        // if(!findUser){
        //     return getResponse(res,400,"user not exist")
        // }
        const findOrder = await findUser.order.find(({_id})=>_id.toHexString() === orderId)
        if(!findOrder){
            return getResponse(res,400,"Order not available")
        }
        await findUser.order.pull({_id : orderId});
        await findUser.save(async(err,docs)=>{
            if(err) throw err
            const userData = await findUser.populate("order.orderedProduct");
            getResponse(res,200,"Order canceled", userData);

        })
        
        

    }catch(err){
        getResponse(res,500,err.message)
    }
}



const userAction = {
    getUser,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
    removeCart,
    incrementQty,
    addAddress,
    removeAddress,
    updateAddress,
    addOrder,
    cancelOrder


}
module.exports = userAction
