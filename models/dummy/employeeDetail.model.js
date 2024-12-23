import { number, required } from "joi";
import mongoose,{Schema} from "mongoose";
import { type } from "os";
import { Employee } from "./employee.model";

const useDetail=new Schema({
    designation:{
        type:string,
        required:[true,'designation is required']

    },
    address:{
        type:string
    },
    mobileNo:{
        type :number,
        required:[true,"mobile no is required"]
    },
    gender:{
        type:string,
        enum:{
            values:['male','female','others'],
            message:'{VALUE} is not supported'
        }
    },
    manager:{
        type:Schema.type.ObjectId,
        ref:'Employee'
    }
},{timestamps:true})