import express from "express";
import authenticationController from "../controllers/authenticationController.js";
const router = express.Router();

router.post("/register", authenticationController.register);
router.post("/login", authenticationController.login);
router.post("/profile", authenticationController.profile);
export default router;
