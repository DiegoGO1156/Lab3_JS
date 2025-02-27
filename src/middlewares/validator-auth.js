import { body } from "express-validator";
import { emailExist } from "../helpers/db-validator.js";
import { validarCampos } from "./validar-campos.js";


export const validatorRegister  = [
    body("name", "El nombre es requerido").not().isEmpty(),
    body("username", "El username es requerido").not().isEmpty(),
    body("email").custom(emailExist),
    body("email", "Ingrese un email valido").isEmail(),
    body("password", "La contraseña debe tener un mínimo de 8 caracteres").isLength({min: 8}),
    validarCampos
]

export const loginValidator = [
    body("username").optional().isString().withMessage("Ingrese un usuario Valido"),
    body("email").optional().isEmail().withMessage("Ingrese un email valido"),
    body("password", "La contraseña debe tener minimo 8 caracteres").isLength({min:8}),
    validarCampos
]