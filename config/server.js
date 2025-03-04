import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/authRoutes.js"
import categoryRoutes from "../src/category/categoryRoutes.js"
import companyRoutes from "../src/company/companyRoutes.js"
import reportRoutes from "../src/reports/reportRoutes.js"



const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) =>{
    app.use("/Interfer/v1/auth", authRoutes)
    app.use("/Interfer/v1/category", categoryRoutes)
    app.use("/Interfer/v1/company", companyRoutes)
    app.use("/Interfer/v1/report", reportRoutes)
}

const conectDB = async() =>{
    try {
        await dbConnection()
        console.log("CONEXIÓN EXITOSA A LA BASE DE DATOS")
    } catch (err) {
        console.log("error al intentar conectar con la DB")
        process.exit(1)
    }
}

export const initServer = async() =>{
    const app  = express()
    const Port = process.env.PORT || 3000
    try {
        middlewares(app)
        conectDB()
        routes(app)
        app.listen(Port)
        console.log(`Server init in port ${Port}`)
    } catch (err) {
        console.log(`Server falied init ${Port}`)
    }
}

//export default initServer