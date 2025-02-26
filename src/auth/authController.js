import {hash} from "argon2"
import Admin from "../admin/adminModel"

export const register = async(req, res) =>{
    try {
        const data = req.body
        const passwordEncrypt = await hash(data.password)


        const adminRegister = await Admin.create({
            ...data,
            password: passwordEncrypt
        })

        return res.status(201).json({
            success: true,
            msg: "REGISTRO REALIZADO CON EXITO",
            adminRegister
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al registrar Usuario",
            error: err.message
        })
    }
}