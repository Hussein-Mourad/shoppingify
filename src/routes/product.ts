import { Router } from "express";
import controller from "../controllers/product";
const router = Router();

router.post("/", controller.createProduct);
router.delete("/:id",controller.deleteProduct)

// router.post("/login", controller.login);
// router.post("/signup", controller.signup);
// router.post("/logout", controller.logout);
export default router;
