import ExcelJS from "exceljs";
import Company from "../company/companyModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateReport = async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const hoja = workbook.addWorksheet("Empresas");

        hoja.columns = [
            { header: "Nombre", key: "name", width: 30 },
            { header: "Nivel de Impacto", key: "levelImpact", width: 30 },
            { header: "Años de experiencia", key: "yearExperience", width: 30 },
            { header: "Categoría", key: "category", width: 30 },
            { header: "Correo", key: "email", width: 30 },
            { header: "Teléfono", key: "phone", width: 30 },
            { header: "Descripción", key: "descripcion", width: 100 },
            { header: "Estado", key: "status", width: 15 },
        ];

        const companies = await Company.find().populate("category");

        companies.forEach((Company) => {
            hoja.addRow({
                name: Company.name,
                levelImpact: Company.levelImpact,
                yearExperience: Company.yearExperience,
                category: Company.category ? Company.category.categoryName : "Sin categoría",
                email: Company.email,
                phone: Company.phone,
                descripcion: Company.descripcion,
                status: Company.status ? "Activo" : "Inactivo",
            });
        });

        const filePath = path.join(__dirname,  "reporte_empresas.xlsx");

        await workbook.xlsx.writeFile(filePath);

        res.download(filePath, "reporte_empresas.xlsx", (err) => {
            if (err) {
                console.error("Error al enviar el archivo:", err);
                return res.status(500).json({
                    success: false,
                    msg: "Error al enviar el reporte",
                    error: err.message
                });
            }
            //fs.unlinkSync(filePath); 
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al generar el reporte",
            error: err.message
        });
    }
};
