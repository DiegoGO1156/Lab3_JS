import  jwt  from "jsonwebtoken"
import Admin from "../admin/adminModel.js"


export const valueJWT = async (req, res, next) =>{
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({ 
            msg: "No hay token en la petición",
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const administrador = await Admin.findById(uid);

        if (!administrador) {
            return res.status(401).json({   
                msg: "Usuario no existe en la base de datos",
            });
        }
        if (!administrador.status) {
            return res.status(401).json({
                msg: "Usuario no válido",
            });
        }

        req.admin = administrador; 
        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Token no válido",
            error: error.message
        });
    }
}