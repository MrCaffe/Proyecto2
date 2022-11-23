import { CartsDao, ProductDao } from "../../Dao/index.js";
import { DATE_UTILS } from "../../utils/index.js";

const getCartById = async (req, res) => {
  const { id } = req.params;
  const cart = await CartsDao.getById(id);
  if (!cart) return res.send({ success: false, message: "Cart not found" });
  res.send({ success: true, cart });
};

const createCart = async (req, res) => {
  try {
    const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

    const cart = await CartsDao.save(baseCart);

    res.send({ success: true, cartId: cart.id });
  } catch (error) {
    res.send(error);
  }
};

const deleteCartById = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await CartsDao.getById(cartId);
    if (!cart) return res.send({ success: false, message: "Cart not found" });

    cart.products = [];
    await CartsDao.deleteById(cartId);

    res.send({ success: true, message: "Cart deleted" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getProductsFromCartId = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await CartsDao.getById(cartId);
    if (!cart) return res.send({ success: false, message: "Cart not found" });

    res.send({ success: true, products: cart.products });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId } = req.body;

    const cart = await CartsDao.getById(cartId);
    if (!cart) return res.send({ success: false, message: "Cart not found" });

    const product = await ProductDao.getById(productId);
    if (!product)
      return res.send({ success: false, message: "Product not found" });

    // Warning error in future
    cart.products.push(product);

    const updatedCart = await CartsDao.updateById(cartId, cart);

    res.send({ success: true, cart: updatedCart });
  } catch (error) {
    res.send(error);
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId } = req.params;
    const cart = await CartsDao.getById(cartId);
    if (!cart) return res.send({ success: false, message: "Cart not found" });

    const product = await ProductDao.getById(productId);
    if (!product)
      return res.send({ success: false, message: "Product not found" });

    //console.log(cart.products)
    const productsFiltered = cart.products.filter(
      (prod) => prod.id !== productId
    );

    cart.products = productsFiltered;

    await CartsDao.updateById(cartId, cart);

    res.send({
      success: true,
      message: `Product removed from CartID: ${cartId} succesfully`,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const CartsController = {
  getCartById,
  createCart,
  deleteCartById,
  getProductsFromCartId,
  addProductToCart,
  deleteProductFromCart,
};
