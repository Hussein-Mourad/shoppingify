import { Router } from "express";
import controller from "../controllers/shoppingList";
import authRequired from "../middlewares/authRequired";
const router = Router();

router.get("/", authRequired, controller.findUserShoppingLists);
router.get("/:id", authRequired, controller.findUserShoppingListById);
router.post("/", authRequired, controller.createShoppingList);
router.put("/:id", authRequired, controller.updateShoppingListById);

export default router;
