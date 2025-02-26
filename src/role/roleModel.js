import {Schema, model} from "mongoose"

export const roleModel = Schema({
    role: {
        type: String,
        default: "ADMIN"
    }
})

export default model("Role", roleModel)