import { Router } from "express";
import { addCompany, getCompanies, updateCompany, generateExcel } from "./company.controller.js";
import { addEnterpriseValidator, updateEnterpriseValidator, getEnterprisesValidator, generateExcelValidator } from "../middlewares/company-validator.js";

const router = Router();

router.post("/add", addEnterpriseValidator, addCompany);
router.get("/list", getEnterprisesValidator, getCompanies);
router.put("/update/:id", updateEnterpriseValidator, updateCompany);
router.get("/generate-excel", generateExcelValidator, generateExcel);

export default router;