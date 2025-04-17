import express from "express";
import { uploadAppointment, getAllAppointments, updateAppointment, deleteAppointment } from "../control/appointmentcontroller.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/upload", isPatientAuthenticated, uploadAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:appointmentId", isAdminAuthenticated, updateAppointment);
router.delete("/delete/:appointmentId", isAdminAuthenticated, deleteAppointment);

export default router;


