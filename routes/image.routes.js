import { Router } from "express";

import { verifyJwt } from "../middleware/auth.middleware.js";
import { getImage } from "../controllers/image.controller.js";

import multer from "multer";


const upload = multer()

const router=Router()

console.log("image",process.env.PORT)
router.use(verifyJwt)

router.route("/getImage").post(upload.none(),getImage)


export default router;