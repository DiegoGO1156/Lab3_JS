import Category from "./categoryModel.js"


export const createCategory = async (req, res) => {
    try {
        
        const data = req.body

        await Category.create({
            categoryName: data.categoryName
        })

        const categ = data.categoryName
        const cate = categ.toUpperCase()

        return res.status(201).json({
            success: true, 
            msg: `CATEGORIA: ${cate}, CREADA CON EXITO!!!` 
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al crear una categoria",
            error: err.message
        })
    }
}

export const updateCategory = async (req,res) =>{
    try {
        
        const {id} = req.params
        const {category} = req.body

        if(!category){
            return res.status(400).json({
                success: false,
                msg: "Ingrese el nuevo nombre de la categoria"
            })
        }

        const categoryFind = await Category.findByIdAndUpdate(id,{categoryName: category}, {new: true})

        return res.status(200).json({
            success: false,
            msg: "CATEGORIA ACTUALIZADA CON EXITO",
            categoryFind
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar la categoria",
            error: err.message
        })
    }
}