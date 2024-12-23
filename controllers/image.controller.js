import { Image } from "../models/image.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import getImageHf from "../utils/getImageHf.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const getImage =asyncHandler(async (req,res)=>{

    const {prompt}=req.body
    const result= await getImageHf(prompt)
    const imageUrl=await uploadCloudinary(result)

    // console.log("local file path",result)
    // console.log(imageUrl)
    const image= await Image.create({
        url:imageUrl.url,
        prompt,
        createdBy:req.user._id
    })
    const generatedImage=await Image.findById(image._id).select("-_id -createdBy")


    res.status(200).json(new ApiResponse(200,{data:generatedImage},"image Generated"))

})

export {getImage}