// src/routes/userRoutes.ts
import express from "express";
import zoneController from "../controllers/zoneController.js";

const router = express.Router();

router.post("/create", zoneController.createZone);
router.post("/get", zoneController.getZone);

export default router;
