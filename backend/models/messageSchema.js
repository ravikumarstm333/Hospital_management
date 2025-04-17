import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: [true, "Message is required!"],
    minLength: [10, "Minimum 10 characters required!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message = mongoose.model("Message", messageSchema);
