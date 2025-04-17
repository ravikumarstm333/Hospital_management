import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";  // Correct Import

export const sendMessage = catchAsyncErrors(async (req, res, next) => { 
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {  
        return next(new ErrorHandler(400, "Please fill in all fields."));
    }

    const newMessage = new Message({
        firstName,
        lastName,
        email,
        phone,
        message,
    });

    await newMessage.save();

    res.status(201).json({
        success: true,
        message: "Message Sent Successfully!",
    });
});


export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();

    res.status(200).json({
        success: true,
        messages,
    });
});