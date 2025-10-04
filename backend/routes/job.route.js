import express from "express";
import { postJob, getAllJobs, getAdminJobs, getJobById } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, postJob);
router.get("/", getAllJobs);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);
router.get("/get/:id", getJobById);

export default router;
