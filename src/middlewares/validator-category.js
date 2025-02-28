import { body, param } from "express-validator"
import {valueJWT} from "../middlewares/validar-jwt.js"
import { validarCampos } from "./validar-campos.js"
import { existCategory } from "../helpers/db-validator.js"


export const validatorNewCategory = [
    valueJWT,
    body("categoryName", "Ingrese una categoria").not().isEmpty(),
    body("categoryName").custom(existCategory),
    validarCampos
]


export const validatorUpdateCategory = [
    valueJWT,
    param("id", "Llene el campo del ID").not().isEmpty(),
    param("id", "Ingrese un ID valido").isMongoId(),
    validarCampos
]
