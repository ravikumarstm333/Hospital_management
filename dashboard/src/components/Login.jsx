import "./Login.css";
import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    setEmail("ravikumarstm333@gmail.com");
    setPassword("123456");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`,
        { email, password, role: "Admin" },
        {
          withCredentials: true,
          headers: { 
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed.");
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("Login request failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-glass-card">
        <div className="login-header">
          <div className="logo-placeholder">
            <img src="src/photoes/logo.png" alt="Prime Care Logo" />
          </div>
          <h1>WELCOME TO <span>PRIME CARE</span></h1>
          <p className="admin-access">Admin Portal Access</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-field">
            <div className="input-icon">
              <FiMail className="icon" />
            </div>
            <div className="input-content">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="email-input"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="input-field">
            <div className="input-icon">
              <FiLock className="icon" />
            </div>
            <div className="input-content">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? (
              <div className="spinner"></div>
            ) : (
              "SIGN IN"
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Secure access to Prime Care administration panel</p>
        </div>
      </div>
    </div>
  );
};

export default Login;