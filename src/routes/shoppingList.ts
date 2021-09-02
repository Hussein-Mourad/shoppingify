import { Router } from "express";
import controller from "../controllers/shoppingList";
import authRequired from "../middlewares/authRequired";
const router = Router();

router.get("/", authRequired, controller.findUserShoppingLists);
router.get("/:id/", authRequired, controller.findUserShoppingListById);
router.get("/stats/top_products", authRequired, controller.getStatistics);
router.get("/stats/chart", authRequired, controller.getChartData);
router.post("/", authRequired, controller.createOrUpdateCurrentShoppingList);
router.put("/:id", authRequired, controller.updateShoppingListById);

export default router;
