import Admin from "../admin/adminModel.js"
import  Category  from "../category/categoryModel.js"


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