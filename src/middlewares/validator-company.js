import {valueJWT} from "../middlewares/validar-jwt.js"
import {body, check} from "express-validator"
import { validarCampos } from "./validar-campos.js"
import { emailExistCompany, existCompany, notExistCompany } from "../helpers/db-validator.js"



export const validatorCompanyRegister = [
    valueJWT,
    body("name", "Ingrese el nombre de la empresa").not().isEmpty(),
    body("name").custom(existCompany),
    body("levelImpact", "Ingrese el nivel de impacto").not().isEmpty(),
    body("yearExperience", "Ingrese los años de experencia de la empresa").not().isEmpty(),
    body("category", "Ingrese la categoria de la empresa").not().isEmpty(),
    body("email", "Ingrese un correo valido").isEmail(),
    body("email", "Ingrese un correo valido").custom(emailExistCompany),
    body("email", "Ingrese un email").not().isEmpty(),
    body("phone", "Ingrese un numero de contacto").not().isEmpty(),
    body("descripcion", "Ingrese una descripcion sobre la empresa").isLength({min: 20}),
    validarCampos
]

export const validatorUpdateCompany = [
    valueJWT,
    body("name", "Ingrese el nombre de la empresa").not().isEmpty(),
    body("name").custom(existCompany),
    body("levelImpact", "Ingrese el nivel de impacto").not().isEmpty(),
    body("yearExperience", "Ingrese los años de experencia de la empresa").not().isEmpty(),
    body("category", "Ingrese la categoria de la empresa").not().isEmpty(),
    body("email", "Ingrese un correo valido").isEmail(),
    body("email", "Ingrese un email").not().isEmpty(),
    body("descripcion", "Ingrese una descripcion sobre la empresa").isLength({min: 20}),
    validarCampos
]