import { Router } from "express";
import { loginAdmin, registerAd } from "./authController.js";
import { loginValidator, validatorRegister } from "../middlewares/validator-auth.js";



const router = Router()

router.post(
    "/register",
    validatorRegister,
    registerAd
)

router.post(
    "/login",
    loginValidator,
    loginAdmin
)

export default router