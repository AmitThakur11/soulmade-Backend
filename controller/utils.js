require('dotenv').config()
const cloudinary = require('cloudinary').v2

const getResponse = (res, status, msg, data) => {
  if (status === 200) {
    return res.status(status).json({
      success: true,
      msg,
      data,
    });
  }

  if (status === 400) {
    return res.status(status).json({
      success: false,
      msg: msg,
    });
  }

  if (status === 500) {
    return res.status(status).json({
      success: false,
      msg: msg,
    });
  }

  if (status === 401) {
    return res.status(status).json({
      success: false,
      msg: msg,
    });
  }
};


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET

})


module.exports = {getResponse, cloudinary};
