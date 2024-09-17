// src/routes/index.ts
import express from "express";
import authenticationRoute from "./authenticationRoute.js";
import zoneRoute from "./zoneRoute.js";

const router = express.Router();

router.use("/auth", authenticationRoute);
router.use("/zone", zoneRoute);

export default router;
