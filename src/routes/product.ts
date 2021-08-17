import { Router } from "express";
import controller from "../controllers/product";
import authRequired from "../middlewares/authRequired";
const router = Router();

router.get("/", authRequired, controller.findUserProducts);
router.get("/:id", authRequired, controller.findProductById);
router.post("/", authRequired, controller.createProduct);
router.delete("/:id", authRequired, controller.deleteProduct);

export default router;
