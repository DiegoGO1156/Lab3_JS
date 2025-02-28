import { Router } from "express";
import {createCategory, updateCategory}  from "./categoryController.js";
import { validatorNewCategory, validatorUpdateCategory } from "../middlewares/validator-category.js";


const router = Router()

router.post(
    "/newCategory",
    validatorNewCategory,
    createCategory
)

router.put(
    "/updateCategory/:id",
    validatorUpdateCategory,
    updateCategory
)

export default router