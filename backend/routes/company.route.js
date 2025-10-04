import express from "express";
import { createCompany, getCompanies, getCompanyById } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, createCompany);
router.get("/list", getCompanies);
router.get("/:id", getCompanyById);

export default router;
