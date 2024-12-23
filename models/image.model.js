import mongoose,{Schema} from "mongoose";
import { User } from "./user.model.js";


const imageSchema=Schema({
    url:{
        type:String
    },
    prompt:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps: true})

export const Image=mongoose.model("Image",imageSchema)