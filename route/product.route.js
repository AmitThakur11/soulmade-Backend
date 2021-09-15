const router = require('express').Router();
const productAction = require('../controller/product.controller')


router.get("/",productAction.getProduct)
router.post("/add",productAction.addProduct);



module.exports = router ;