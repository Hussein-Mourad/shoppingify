import { Router } from "express";
import controller from "../controllers/product";
const router = Router();

router.post("/", controller.createProduct);
router.get("/", controller.findAllUserProducts);
router.get("/:id", controller.findProductById);
router.delete("/:id", controller.deleteProduct);

export default router;
