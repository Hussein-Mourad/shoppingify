import { Router } from "express";
import controller from "../controllers/category";
const router = Router();
import authRequired from "../middlewares/authRequired";

router.post("/", authRequired, controller.createCategory);
router.get("/", authRequired, controller.findAllUserCategories);
router.get("/:id", authRequired, controller.findCategoryById);

export default router;
