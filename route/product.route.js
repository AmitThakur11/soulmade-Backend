const router = require("express").Router();
const productAction = require("../controller/product.controller");
const authVerify = require("../middleware/auth.middleware");


router.get("/", productAction.getProduct);
router.use(authVerify);
router.post("/add", productAction.addProduct);
router.post("/edit/:productId", productAction.editProduct)

module.exports = router;
