import { Router } from "express";
import { CartsController } from "../../controllers/index.js";

const router = Router();

router.get("/:id", CartsController.getCartById);

router.post("/", CartsController.createCart);

router.delete("/:cartId", CartsController.deleteCartById);

router.get("/:cartId/products", CartsController.getProductsFromCartId);

router.post("/:cartId/products", CartsController.addProductToCart);

router.delete("/:cartId/products/:productId", CartsController.deleteProductFromCart);

export { router as CartRouter };
