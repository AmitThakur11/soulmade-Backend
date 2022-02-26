const router = require("express").Router();
const app = require("express");
const authVerify = require("../middleware/auth.middleware");
const userAction = require("../controller/userData.controller");
const eval_param = require("../middleware/evalParam.middleware");

router.use(authVerify);

router.get("/userinfo", userAction.getUser);
router.get("/wishlist", userAction.getWishlist);
router.get("/:userId/profile" , userAction.getUserProfile);



router.param("product_id", eval_param.product_param);

router
  .route("/wishlist/:product_id")
  .post(userAction.addToWishlist)
  .delete(userAction.removeFromWishlist);

router
  .route("/cart/:product_id")
  .post(userAction.addToCart)
  .delete(userAction.removeFromCart);

router.post("/cart/:product_id/update_qty", userAction.incrementQty);
router.post("/cart/update", userAction.removeCart);

router.param("/address_id", eval_param.address_param);

router.route("/address").post(userAction.addAddress);

router
  .route("/address/:address_id")
  .post(userAction.updateAddress)
  .delete(userAction.removeAddress);

router.route("/address/:address_id/default").post(userAction.defaultAddress);

router.param("order_id", eval_param.orderParam);

router.post("/order/create", userAction.createOrder);
router.post("/order/add", userAction.addOrder);
router.delete("/order/:order_id/cancel", userAction.cancelOrder);

module.exports = router;
