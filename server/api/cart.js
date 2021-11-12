const {
  models: { User, CartItem, Cart, Product },
} = require("../db");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const cartData = await CartItem.findAll();
    console.log(cartData);
    res.send(cartData);
  } catch (error) {
    next(error);
  }
});
//Returns the cart of the user given userId
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
    }
    const cart = await user.getCart({ include: { model: CartItem } });

    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });
    console.log(cartItems);
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

router.delete("/:pId", async (req, res, next) => {
  try {
    const cartProduct = await CartItem.findOne({
      where: { id: req.params.pId },
    });
    await cartProduct.destroy();
    res.json(cartProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
