import {hash, verify} from "argon2"
import Admin from "../admin/adminModel.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const registerAd = async(req, res) =>{
    try {
        const data = req.body
        const passwordEncrypt = await hash(data.password)


        const adminRegister = await Admin.create({
            name: data.name,
            username: data.username,
            email: data.email,
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

export const loginAdmin = async(req, res) =>{
    try {
        
        const {email, username, password} = req.body

        const lowerEmail = email ? email.toLowerCase() : null
        const lowerUsername = username ? username.toLowerCase() : null

        const user = await Admin.findOne({
            $or: [{email: lowerEmail}, {username: lowerUsername}]
        })

        if(!user){
            return res.status(404).json({
                success: false,
                msg: "Usuario inexistente o eliminado"
            })
        }

        if(!user.status){
            return res.status(404).json({
                success: false,
                msg: "Usuario eliminado"
            })
        }

        const validPass = await verify(user.password, password)

        if(!validPass){
            return res.status(401).json({
                success: false,
                msg: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        const usernameSaludo = username.toUpperCase()

        return res.status(201).json({
            success: true,
            msg: `BIENVIENIDO ${usernameSaludo}`,
            token: token
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Erro al intentar hacer Login",
            error: err.message
        })
    }
}