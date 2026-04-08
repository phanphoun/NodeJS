import AuthController from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import { validateRegister, validateLogin } from "../middleware/validation.middleware.js";

import { Router } from "express";

const router = Router();

router.post("/login", validateLogin, AuthController.login);
router.post("/register", validateRegister, AuthController.register);
router.post("/logout", AuthController.logout);
router.get("/profile", authMiddleware.verify, AuthController.getProfile);

export default router;