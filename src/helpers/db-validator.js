import Admin from "../admin/adminModel.js"


export const emailExist = async(email = "") =>{
    const existEmail = await Admin.findOne({email})
    if(existEmail){
        throw new Error (`El email ${existEmail} ya esta en uso`)
    }
}
