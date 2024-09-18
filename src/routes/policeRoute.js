import express from "express";
import {updateStationIdController,getAllPoliceRecordsController} from "../controllers/policeController.js";
const router = express.Router();
router.post("/updateStationId", updateStationIdController);
router.get("/getPoliceRecords", getAllPoliceRecordsController);
export default router;