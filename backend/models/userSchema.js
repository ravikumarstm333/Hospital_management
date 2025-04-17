import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    unique: true,
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
  aadharnumber: {
    type: String,
    required: [true, "Aadhar Number is required!"],
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
  role: {
    type: String,
    enum: ["Admin", "Patient", "Doctor"],
    default: "Patient",
  },
  doctorDepartment: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [6, "Password must be at least 6 characters!"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Generate JWT token
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🔑 Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
