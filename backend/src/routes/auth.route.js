import AuthController from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "API is working!" });
});

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout);
router.get("/profile", authMiddleware.verify, AuthController.getProfile);

export default router;