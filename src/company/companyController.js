import Company from "./companyModel.js"
import Category from "../category/categoryModel.js"


export const registerCompany = async (req, res) =>{
    try {
        
        const data = req.body

        const category = await Category.findOne({categoryName: data.category})

        const company = new Company({
            ...data,
            category: category._id
        })

        await company.save()

        return res.status(201).json({
            success: true,
            msg: "COMPAÑIA REGISTRADA CON EXITO!!!",
            company
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al Registrar la empresa",
            error: err.message
        })
    }
}

export const listCompanies = async (req, res) =>{
    try {
        
        let { name, email, levelImpact, yearExperience, category, phone, sort } = req.query;

        let filter = {};

        if (name) filter.name = { $regex: name, $options: "i" };
        if (email) filter.email = { $regex: email, $options: "i" };
        if (levelImpact) filter.levelImpact = levelImpact;
        if (yearExperience) filter.yearExperience = Number(yearExperience);
        if (category) filter.category = category;
        if (phone) filter.phone = Number(phone);
        
        let order = {};
        if (sort === "asc") order.name = 1;
        if (sort === "desc") order.name = -1;
        
        order.levelImpact = 1
        order.yearExperience = 1
        order.category = 1
        order.phone = 1

        const companies = await Company.find(filter).sort(order).populate("category", "categoryName")


        return res.status(200).json({
            companies
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al listar las Empresas",
            error: err.message
        })
    }
}

export const editCompany = async (req,res) =>{
    try {
        
        const {id} = req.params
        const {name, levelImpact, yearExperience, category, phone, descripcion} = req.body

        const findCategory = await Category.findOne({categoryName: category})

        const company = await Company.findByIdAndUpdate(id, {name: name, levelImpact: levelImpact, yearExperience: yearExperience, category: findCategory._id, phone: phone, descripcion: descripcion },{new: true})

        return res.status(200).json({
            msg: "Datos Actualizados con Exito!!!",
            update: {
                company
            }
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar los datos de la Empresa",
            error: err.message
        })
    }
}