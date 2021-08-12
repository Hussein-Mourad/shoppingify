import { Router } from "express";
import controller from "../controllers/auth";
const router = Router();

router.post("/", controller.isAuth)
router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/logout", controller.logout);
export default router;
