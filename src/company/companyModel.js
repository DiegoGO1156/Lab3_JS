import {Schema, model} from "mongoose"

export const companyModel = Schema({
    name:{
        type: String,
        required: true
    },
    levelImpact:{
        type: String,
        required: true,
        enum: ["Alto", "Medio", "Bajo"]
    },
    yearExperience:{
        type: Number,
        required: true,
        min: 3
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        min: 8
    },
    descripcion:{
        type: String,
        required: true,
        max: 350
    },
    status:{
        type : Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default model("Company", companyModel)