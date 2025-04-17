import "./Login.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: false,
      password: false
    };

    if (!email || !email.includes('@')) {
      newErrors.email = true;
      valid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { 
          email, 
          password, 
          confirmPassword: password, 
          role: "Patient" 
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (res.data.success) {
        toast.success(res.data.message || "Login Successful!");
        setIsAuthenticated(true);
        navigateTo("/");
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
      // Highlight fields if server returns specific field errors
      if (error.response?.data?.errors) {
        setErrors({
          email: error.response.data.errors.email || false,
          password: error.response.data.errors.password || false
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          className={errors.email ? 'error' : ''}
          placeholder="Email" 
          value={email} 
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({...errors, email: false});
          }} 
          required 
        />
        {errors.email && <span className="error-message">Please enter a valid email</span>}
        
        <input 
          type="password" 
          className={errors.password ? 'error' : ''}
          placeholder="Password" 
          value={password} 
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({...errors, password: false});
          }} 
          required 
          minLength={6}
        />
        {errors.password && <span className="error-message">Password must be at least 6 characters</span>}
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p>Not Registered? <Link to="/register">Register Now</Link></p>
    </div>
  );
};

export default Login;