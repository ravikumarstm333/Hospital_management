import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Provide a valid email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required!"],
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Phone number must be exactly 10 digits!",
    },
  },
  aadharnumber: {  // Replaced nic with aadharnumber
    type: String,
    required: [true, "Aadhar Number is required!"],  // Updated field name
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Gender is required!"],
  },
  dob: {
    type: String,
    required: [true, "Date of Birth is required!"],
  },
  appointment_date: {
    type: String,
    required: [true, "Appointment Date is required!"],
  },
  department: {
    type: String,
    required: [true, "Department is required!"],
  },
  doctor: {
    firstName: {
      type: String,
      required: [true, "Doctor's First Name is required!"],
    },
    lastName: {
      type: String,
      required: [true, "Doctor's Last Name is required!"],
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: [true, "Address is required!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
