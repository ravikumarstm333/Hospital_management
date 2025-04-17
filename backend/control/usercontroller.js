import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import { GenerateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, aadharnumber, gender, dob, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !aadharnumber || !gender || !dob || !password) {
    return next(new ErrorHandler(400, "Please fill all required fields!"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler(400, "User already exists with this email!"));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    aadharnumber,
    gender,
    dob,
    password,
    role: "Patient",
  });

  GenerateToken(user, "Patient registered successfully!", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler(400, "Please fill all required fields!"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(401, "Invalid Email or password!"));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, "Invalid Email or password!"));
  }

  if (user.role !== role) {
    return next(new ErrorHandler(400, "User with this role is not registered!"));
  }

  GenerateToken(user, "User logged in successfully!", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, aadharnumber, gender, dob, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !aadharnumber || !gender || !dob || !password) {
    return next(new ErrorHandler(400, "Please fill all required fields!"));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(400, `${isRegistered.role} already exists with this email!`));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    aadharnumber,
    gender,
    dob,
    password,
    role: "Admin",
  });

  res.status(201).json({ success: true, message: "New Admin registered successfully!" });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });

  if (!doctors || doctors.length === 0) {
    return next(new ErrorHandler(404, "No doctors found!"));
  }

  res.status(200).json({
    success: true,
    count: doctors.length,
    doctors,
  });
});

export const getUserDetail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler(404, "User not found!"));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res.cookie("AdminToken", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Admin logged out successfully!"
  });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res.cookie("PatientToken", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Patient logged out successfully!"
  });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, aadharnumber, gender, dob, password, doctorDepartment } = req.body;

  if (!firstName || !lastName || !email || !phone || !aadharnumber || !gender || !dob || !password || !doctorDepartment) {
    return next(new ErrorHandler(400, "Please fill all required fields!"));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(400, "User with this email is already registered!"));
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    aadharnumber,
    gender,
    dob,
    password,
    doctorDepartment,
    role: "Doctor",
  });

  res.status(201).json({
    success: true,
    message: "New Doctor registered successfully!",
    doctor
  });
});
