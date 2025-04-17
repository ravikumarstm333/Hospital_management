import express from "express";
import { sendMessage } from "../control/messagecontroller.js";
import { isAdminAuthenticated} from "../middlewares/auth.js";
import { getAllMessages } from "../control/messagecontroller.js";


const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);

export default router;