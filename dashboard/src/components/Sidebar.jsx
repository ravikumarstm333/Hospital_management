import "./Sidebar.css";
import React, { useContext, useState } from "react";
import { RiLogoutBoxFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { 
  FaHome, 
  FaUserMd, 
  FaUserPlus, 
  FaCalendarPlus,
  FaCalendarAlt,
  FaEnvelope,
  FaUserShield
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/admin/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const goTo = (path) => {
    navigateTo(path);
    setShow(false); // close the menu after click
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Top Navbar */}
      <nav className={show ? "sidebar show" : "sidebar"}>
        <div className="links">
          <span onClick={() => goTo("/")}>
            <FaHome className="icon" /> Home
          </span>
          <span onClick={() => goTo("/doctors")}>
            <FaUserMd className="icon" /> Doctors
          </span>
          <span onClick={() => goTo("/admin/addnew")}>
            <FaUserShield className="icon" /> Add Admin
          </span>
          <span onClick={() => goTo("/doctor/addnew")}>
            <FaUserPlus className="icon" /> Add Doctor
          </span>
          <span onClick={() => goTo("/upload")}>
            <FaCalendarPlus className="icon" /> Book Appointment
          </span>
          <span onClick={() => goTo("/appointments")}>
            <FaCalendarAlt className="icon" /> Appointments
          </span>
          <span onClick={() => goTo("/messages")}>
            <FaEnvelope className="icon" /> Messages
          </span>
          <span onClick={handleLogout}>
            <RiLogoutBoxFill className="icon" /> Logout
          </span>
        </div>
      </nav>

      {/* Hamburger Button for Mobile */}
      <div className="wrapper">
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;