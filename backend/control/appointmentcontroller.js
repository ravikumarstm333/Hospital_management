import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import { Appointment } from '../models/appointmentSchema.js';
import { User } from '../models/userSchema.js';
import { generateAppointmentPDF } from "../services/pdfService.js";
import { sendAppointmentEmail } from "../services/emailService.js";



export const uploadAppointment = catchAsyncErrors(async (req, res, next) => {
    const { 
        firstName,
        lastName,
        email,
        phone,
        aadharnumber,
        gender,
        dob,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;

    // Check if all required fields are present
    if (!firstName || !lastName || !email || !phone || !aadharnumber || !gender || !dob || 
        !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address) {
        return next(new ErrorHandler(400, "Please fill all the form"));
    }

    // Check if doctor exists in the database
    const isConflict = await User.find({
        firstName: { $regex: new RegExp(`^${doctor_firstName}$`, "i") }, 
        lastName: { $regex: new RegExp(`^${doctor_lastName}$`, "i") },
        role: "Doctor",
        doctorDepartment: { $regex: new RegExp(`^${department}$`, "i") }
    });

    if (isConflict.length === 0) {
        return next(new ErrorHandler(404, "Doctor not found"));
    }

    if (isConflict.length > 1) {
        return next(new ErrorHandler(400, "Multiple doctors found, please specify one."));
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user.id;

    // Create the appointment in the database
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        aadharnumber,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName
        },
        hasVisited,
        address,
        doctorId,
        patientId,
        status: "Pending",  // Initially set as Pending
    });

    res.status(200).json({
        success: true,
        message: "Appointment uploaded successfully",
        appointment,
    });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find().populate("doctorId", "firstName lastName email phone");

    if (!appointments || appointments.length === 0) {
        return next(new ErrorHandler(404, "No Appointments found!"));
    }

    res.status(200).json({
        success: true,
        count: appointments.length,
        appointments
    });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
        return next(new ErrorHandler(404, "Appointment not found"));
    }

    await appointment.deleteOne();

    res.status(200).json({
        success: true,
        message: "Appointment deleted successfully!"
    });
});

export const updateAppointment = catchAsyncErrors(async (req, res, next) => {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(appointmentId).populate("doctorId", "firstName lastName");
    if (!appointment) {
        return next(new ErrorHandler(404, "Appointment not found"));
    }

    // Appointment Status Update
    appointment.status = status;
    await appointment.save();

    // ✅ अगर Appointment Confirmed है, तभी Email और PDF भेजो
    if (status === "Confirmed") {
        const filePath = await generateAppointmentPDF(appointment);
        await sendAppointmentEmail(appointment, filePath);
    }

    res.status(200).json({
        success: true,
        message: `✅ Appointment updated successfully! Status: ${status}.`
    });
});
