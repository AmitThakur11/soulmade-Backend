const router = require('express').Router();
const app = require('express')
const authVerify = require("../middleware/auth.middleware");
const userAction = require("../controller/userData.controller")
const eval_param = require("../middleware/evalParam.middleware")
router.use(authVerify)

router.get("/userinfo",userAction.getUser)
router.get("/wishlist",userAction.getWishlist)

router.param("product_id", eval_param.product_param)

router.route("/wishlist/:product_id")
.post(userAction.addToWishlist)
.delete(userAction.removeFromWishlist)

router.route("/cart/:product_id")
.post(userAction.addToCart)
.delete(userAction.removeFromCart)

router.post("/cart/:product_id/update_qty" , userAction.incrementQty)
router.post("/cart/update", userAction.updateCart)

router.param("/address_id", eval_param.address_param)

router.route("/address")
.post(userAction.addAddress)

router.route("/address/:address_id")
.post(userAction.updateAddress)
.delete(userAction.removeAddress)



module.exports = router;
