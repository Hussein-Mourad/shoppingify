import { Router } from "express";
const router = Router();
import controller from "@controllers/auth" 

router.get("/login", controller.login);
