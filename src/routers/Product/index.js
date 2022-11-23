import { Router } from "express";
import { ProductController } from "../../controllers/index.js";
import { verifyRole } from "../../middlewares/index.js";

const router = Router();

router.get("/", ProductController.getAll);

router.get("/:id", ProductController.getById);

router.post("/", verifyRole, ProductController.saveProduct);

router.put("/:id", verifyRole, ProductController.updateProduct);

router.delete("/:id", verifyRole, ProductController.deleteProduct);

router.delete("/", verifyRole, ProductController.deleteAllProducts);

export { router as ProductRouter };
