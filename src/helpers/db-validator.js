import Admin from "../admin/adminModel.js"
import  Category  from "../category/categoryModel.js"
import Company from "../company/companyModel.js"


export const emailExist = async(email = "") =>{
    const existEmail = await Admin.findOne({email})
    if(existEmail){
        throw new Error (`El email ${existEmail} ya esta en uso`)
    }
}

export const existCategory = async(categoryName = "") =>{
    const existCateg = await Category.findOne({categoryName})
    if(existCateg){
        throw new Error (`La categoria ${categoryName}, ya existe`)
    }
}

export const notExistCategory = async(categoryName = "") =>{
    const existCateg = await Category.findOne({categoryName})
    if(!existCateg){
        throw new Error (`La categoria ${categoryName}, no existe`)
    }
}

export const existCompany = async (name = "") =>{
    const company = await Company.findOne({name})
    if(company){
        throw new Error (`${name} ya esta registrada`)
    }
}

export const emailExistCompany = async (email = "") =>{
    const emailCompany = await Company.findOne({email})
    if(emailCompany){
        throw new Error (`El email ${email} de la empresa pertenece a otra`)
    }
}

export const notExistCompany = async (id = "") =>{
    const notExistCompany = await Company.findOne({id})
    if(notExistCompany){
        throw new Error (`El ID ${id} no pertenece a ninguna empresa`)
    }
}