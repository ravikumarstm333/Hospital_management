import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";  // ✅ सही किया
import { ErrorHandler } from "../middlewares/errorMiddleware.js"; // ✅ सही import

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => { 
    console.log("🔍 Cookies Received:", req.cookies);  

    const token = req.cookies.AdminToken;  // ✅ Check Case-Sensitivity
    if (!token) {
        console.log("❌ No Admin Token Found!");
        return next(new ErrorHandler(401, "Admin is not authenticated!"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        req.user = await User.findById(decoded.id);
        if (!req.user) {
            console.log("❌ User Not Found in Database!");
            return next(new ErrorHandler(404, "User not found!"));
        }

        if (req.user.role.toLowerCase() !== "admin") {
            console.log(`❌ Role mismatch: Found ${req.user.role}, Expected 'Admin'`);
            return next(new ErrorHandler(401, `${req.user.role} is not authenticated!`));
        }

        console.log("✅ Authentication Successful!");
        next();
    } catch (error) {
        console.log("❌ Token Verification Failed:", error.message);
        return next(new ErrorHandler(401, "Invalid token! Please login again."));
    }
});



export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    console.log("🔍 Cookies Received:", req.cookies);  // Debugging Log

    const token = req.cookies.PatientToken;  // 🔥 Ensure Correct Case
    if (!token) {
        console.log("❌ No Patient Token Found in Cookies!");
        return next(new ErrorHandler(401, "Patient is not authenticated!"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Patient Token:", decoded);

        req.user = await User.findById(decoded.id);
        if (!req.user) {
            console.log("❌ User Not Found in Database!");
            return next(new ErrorHandler(404, "User not found!"));
        }

        if (req.user.role.toLowerCase() !== "patient") {
            console.log(`❌ Role mismatch: Found ${req.user.role}, Expected 'patient'`);
            return next(new ErrorHandler(401, `${req.user.role} is not authenticated!`));

        }

        console.log("✅ Authentication Successful!");
        next();
    } catch (error) {
        console.log("❌ Token Verification Failed:", error.message);
        return next(new ErrorHandler(401, "Invalid token! Please login again."));
    }
});
