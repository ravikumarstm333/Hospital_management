import express from "express";
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetail, login, logoutAdmin, logoutPatient, patientRegister } from "../control/usercontroller.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";  // ✅ Fix किया

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetail);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/me", isPatientAuthenticated, getUserDetail);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);



export default router;
