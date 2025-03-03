import { Router } from "express";
import { editCompany, listCompanies, registerCompany } from "./companyController.js";
import { validatorCompanyRegister, validatorUpdateCompany } from "../middlewares/validator-company.js";
import { check } from "express-validator";
import { notExistCompany } from "../helpers/db-validator.js";



const router = Router()

router.post(
    "/newCompany",
    validatorCompanyRegister,
    registerCompany
)

router.get(
    "/companies",
    listCompanies
)

router.put(
    "/updateCompany/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(notExistCompany)
    ],
    validatorUpdateCompany,
    editCompany
)

export default router;