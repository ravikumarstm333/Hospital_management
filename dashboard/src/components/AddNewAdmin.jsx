import "./AddNewAdmin.css";

import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAadhar("");
    setDob("");
    setGender("");
    setPassword("");
  };

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      if (!baseURL) {
        throw new Error("API base URL is not defined in .env file");
      }

      const response = await axios.post(
        `${baseURL}/api/v1/user/admin/addnew`,
        {
          firstName,
          lastName,
          email,
          phone,
          aadharnumber: aadhar, // Updated key
          dob,
          gender,
          password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message || "Admin added successfully!");
      setIsAuthenticated(true);
      resetForm();
      navigateTo("/");
    } catch (error) {
      console.error("Error adding admin:", error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong.");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="AddNewAdminpage">
      <section className="container form-component add-admin-form">
        <h1 className="form-title">Add New Admin</h1>
        <form onSubmit={handleAddNewAdmin}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Aadhar Number"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              required
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Add New Admin</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin;
