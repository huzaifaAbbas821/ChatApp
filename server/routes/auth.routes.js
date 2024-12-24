import {Router} from "express"
import { signUpUser , login,logout } from "../controllers/auth.controllers.js";


const router = Router();


router.route("/signup").post(signUpUser);
router.route("/login").post(login);
router.route("/logout").post(logout);



export default router;