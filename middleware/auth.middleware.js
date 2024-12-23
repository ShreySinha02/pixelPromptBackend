import { ApiErrors } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";


export const verifyJwt=asyncHandler(async(req,_,next)=>{
    try{

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiErrors(401, "Unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        console.log("got user name from verifyJwt",user)

        if (!user) {
            
            throw new ApiErrors(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()

    }
    catch(err)
    {
        throw new ApiErrors(401, err?.message || "Invalid access token")
    }
})
