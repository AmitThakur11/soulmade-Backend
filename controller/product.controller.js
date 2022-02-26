const Product = require("../models/product.model");
const {getResponse,cloudinary} = require("./utils")
const getProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    if (!product) {
      return res.status(400).json({
        success: false,
        msg: "No products available right now",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Data fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
const addProduct = async (req, res) => {
  try {
    const user = req.user;
    let  product = req.body;
    console.log(product)
    let upload =  await cloudinary.uploader.upload(product.img,{
      upload_preset : "z0t3ezb4"
    })
    const updateProduct = {...product, seller : user.id , img  : upload.url}
    
    console.log(updateProduct);
    res.json(updateProduct)
    
    // const newProduct = await new Product(product);
    // await newProduct.save((err, docs) => {
    //   if (err) throw err;
    //   res.status(200).json({
    //     success: true,
    //     msg: "Product added",
    //   });
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

const editProduct =async(req,res)=>{
  try{

    const user = req.user;
    const {editedData} = req.body
    const {productId} = req.params;

    console.log(productId)
    const findProduct = await Product.findById(productId);

    const access = findProduct.seller.toHexString() === user.id;
    if(!access){
      return getResponse(res,400,"Invalid access")
    }


    await Product.updateOne({
      _id : findProduct._id
  },editedData, { upsert: true });


  const updateProduct = await Product.findById(findProduct._id);




    getResponse(res,200,"You can edit this",updateProduct)
    

  }catch(err){
    getResponse(res,500,err.message)
  }
}

const productAction = {
  getProduct: getProduct,
  addProduct: addProduct,
  editProduct : editProduct
};

module.exports = productAction;
