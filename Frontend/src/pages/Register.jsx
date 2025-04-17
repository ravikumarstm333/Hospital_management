import "./Register.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aadharnumber: "", // Correct field name
    dob: "",
    gender: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    aadharnumber: false, // Correct field name
    dob: false,
    gender: false,
    password: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = true;
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = true;
      isValid = false;
    }

    // Email validation
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = true;
      isValid = false;
    }

    // Phone validation
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = true;
      isValid = false;
    }

    // Aadhar Number validation
    if (!formData.aadharnumber) { // Correct field name
      newErrors.aadharnumber = true;
      isValid = false;
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = true;
      isValid = false;
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = true;
      isValid = false;
    }

    // Password validation
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/patient/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        aadharnumber: "", // Correct field name
        dob: "",
        gender: "",
        password: ""
      });

    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.response?.data?.message || "Registration failed!");
      
      // Highlight fields if server returns specific field errors
      if (error.response?.data?.errors) {
        setErrors(prev => ({
          ...prev,
          ...error.response.data.errors
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component register-form">
      <h2>Create Your Account</h2>
      <p className="subtitle">Join PrimeCare Hospital today</p>
      <p className="description">
        Register to access personalized healthcare services and manage your medical records.
      </p>
      
      <form onSubmit={handleRegistration}>
        <div className="form-row">
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
              required
            />
            {errors.firstName && <span className="error-message">First name is required</span>}
          </div>
          <div className="input-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
              required
            />
            {errors.lastName && <span className="error-message">Last name is required</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <span className="error-message">Please enter a valid email</span>}
          </div>
          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              required
            />
            {errors.phone && <span className="error-message">Valid phone number required</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <input
              type="text"
              name="aadharnumber"
              placeholder="Aadhar Number" // Correct field name
              value={formData.aadharnumber}
              onChange={handleChange}
              className={errors.aadharnumber ? 'error' : ''}
              required
            />
            {errors.aadharnumber && <span className="error-message">Aadhar number is required</span>}
          </div>
          <div className="input-group">
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className={errors.dob ? 'error' : ''}
              required
            />
            {errors.dob && <span className="error-message">Date of birth is required</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="error-message">Please select gender</span>}
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              minLength={6}
              required
            />
            {errors.password && <span className="error-message">Password must be at least 6 characters</span>}
          </div>
        </div>

        <div className="form-footer">
          <p>
            Already registered?{" "}
            <Link to="/login" className="login-link">
              Login Now
            </Link>
          </p>
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
