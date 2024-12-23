import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { registerUser,loginUser,logoutUser } from "../controllers/user.controller.js";

const router = Router();



router.route("/check").get((req,res)=>{

    res.send("working")

})
router.route('/register').post(registerUser)


router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt,  logoutUser)


export default router