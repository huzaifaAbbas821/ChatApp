import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();


router.route("/send-message/:id").post(protectedRoute,sendMessage);
router.route("/get-message/:id").get(protectedRoute, getMessage);


export default  router;