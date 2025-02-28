import { model, Schema } from "mongoose";


export const categoryModel = Schema({
    categoryName: {
        type: String,
        required: true,
        max: 200
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default model("Category", categoryModel)