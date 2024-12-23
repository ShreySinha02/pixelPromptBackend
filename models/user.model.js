import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new Schema({
    email:{
        type:String,
        required:[true,"User Email is required"],
        unique:[true,"User Email should be unique"],
        validate:{
            validator: function(email){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);    
            },
            message: (props) => `${props.value} is not a valid email address!`,
 
        }
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
  

},{ timestamps: true })

userSchema.pre('save',async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function()
{
    return jwt.sign(
        {
            _id:this._id,
            email:this.empId,
        }
    ,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User= mongoose.model("User",userSchema)

