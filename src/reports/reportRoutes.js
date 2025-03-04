import { Router } from "express";
import { generateReport } from "./generateReport.js";


const router = Router()


router.get(
    "/report",
    generateReport
)

export default router