import express from "express"
import {getUserForSidebar} from "../controllers/user.controllers.js"
import { protectedRoute } from "../middlewares/protectedRoute.js";


const router = express.Router();

router.get("/",protectedRoute,getUserForSidebar)
// router.get("/is-valid",protectedRoute, (req,res) => {
//     if(user){
//      res.status(200).json(true);
//     }
// })

export default router;