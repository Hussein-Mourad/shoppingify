import { Router } from "express";
import controller from "../controllers/product";
import authRequired from "../middlewares/authRequired";
const router = Router();

router.post("/", authRequired, controller.createProduct);
router.get("/", authRequired, controller.findAllUserProducts);
router.get("/:id", authRequired, controller.findProductById);
router.delete("/:id", authRequired, controller.deleteProduct);

export default router;
