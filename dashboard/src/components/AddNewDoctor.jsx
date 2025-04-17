import "./AddNewDoctor.css";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewDoctor = () => {
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
  const [doctorDepartment, setDoctorDepartment] = useState("");

  const departmentsArray = [
    "Emergency & Trauma Care",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Oncology",
    "Radiology & Imaging",
    "Dermatology",
    "ENT (Ear, Nose, Throat)",
    "Physical Therapy & Rehabilitation",
    "Gynecology & Maternity Care",
    "Urology",
    "Gastroenterology",
    "Pulmonology",
    "Endocrinology",
  ];

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAadhar("");
    setDob("");
    setGender("");
    setPassword("");
    setDoctorDepartment("");
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("aadharnumber", aadhar); // Updated key
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/doctor/addnew`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data.message || "Doctor registered successfully!");
      setIsAuthenticated(true);
      resetForm();
      navigateTo("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="AddNewDoctorpage">
      <section className="container add-doctor-form">
        <h1 className="form-title">Register a New Doctor</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
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
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
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
              <select
                value={doctorDepartment}
                onChange={(e) => setDoctorDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departmentsArray.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <button type="submit">Register New Doctor</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;
