import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./AdminAppointmentForm.css";

const AdminAppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aadharnumber: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    department: "Pediatrics",
    doctorFirstName: "",
    doctorLastName: "",
    address: "",
    hasVisited: false
  });

  const [aadharError, setAadharError] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/doctors`,
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };
    fetchDoctors();
  }, []);

  // Real-time Aadhar validation
  useEffect(() => {
    const checkAadhar = async () => {
      if (formData.aadharnumber.length === 12) {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/check-aadhar`,
            { 
              params: { aadharnumber: formData.aadharnumber },
              withCredentials: true 
            }
          );
          setAadharError(data.exists ? "This Aadhar is already registered" : "");
        } catch (error) {
          setAadharError("");
        }
      } else {
        setAadharError("");
      }
    };
    
    const timer = setTimeout(checkAadhar, 500);
    return () => clearTimeout(timer);
  }, [formData.aadharnumber]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDepartmentChange = (e) => {
    setFormData(prev => ({
      ...prev,
      department: e.target.value,
      doctorFirstName: "",
      doctorLastName: ""
    }));
  };

  const handleDoctorChange = (e) => {
    const [firstName, ...lastNameParts] = e.target.value.split(" ");
    const lastName = lastNameParts.join(" ");
    setFormData(prev => ({
      ...prev,
      doctorFirstName: firstName || "",
      doctorLastName: lastName || ""
    }));
  };

  const validateForm = () => {
    // Check all required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'aadharnumber', 'dob', 'gender', 'appointmentDate',
      'department', 'doctorFirstName', 'doctorLastName', 'address'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`);
        return false;
      }
    }

    // Validate Aadhar (12 digits)
    if (!/^\d{12}$/.test(formData.aadharnumber)) {
      toast.error("Aadhar number must be exactly 12 digits");
      return false;
    }

    // Validate Phone (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }

    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Check for duplicate Aadhar
    if (aadharError) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString();
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/upload`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          aadharnumber: formData.aadharnumber,
          dob: formatDate(formData.dob),
          gender: formData.gender,
          appointment_date: formatDate(formData.appointmentDate),
          department: formData.department,
          doctor_firstName: formData.doctorFirstName,
          doctor_lastName: formData.doctorLastName,
          visited: formData.hasVisited,
          address: formData.address
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      toast.success(data.message);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        aadharnumber: "",
        dob: "",
        gender: "",
        appointmentDate: "",
        department: "Pediatrics",
        doctorFirstName: "",
        doctorLastName: "",
        address: "",
        hasVisited: false
      });
    } catch (error) {
      console.error("Submission error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-appointment-container">
      <div className="admin-appointment-form">
        <h2 className="form-title">Book Appointment for Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Personal Information */}
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  if (/^\d{0,10}$/.test(e.target.value)) {
                    handleChange(e);
                  }
                }}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Aadhar Number *</label>
              <input
                type="text"
                name="aadharnumber"
                value={formData.aadharnumber}
                onChange={(e) => {
                  if (/^\d{0,12}$/.test(e.target.value)) {
                    handleChange(e);
                  }
                }}
                required
              />
              {aadharError && <span className="error-message">{aadharError}</span>}
            </div>
            
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Appointment Details */}
            <div className="form-group">
              <label>Appointment Date *</label>
              <input
                type="datetime-local"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleDepartmentChange}
                required
              >
                {departmentsArray.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Doctor *</label>
              <select
                value={`${formData.doctorFirstName} ${formData.doctorLastName}`}
                onChange={handleDoctorChange}
                disabled={!formData.department}
                required
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter(doctor => doctor.doctorDepartment === formData.department)
                  .map((doctor, index) => (
                    <option
                      key={index}
                      value={`${doctor.firstName} ${doctor.lastName}`}
                    >
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
              </select>
            </div>
            
            <div className="form-group full-width">
              <label>Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="hasVisited"
                  checked={formData.hasVisited}
                  onChange={handleChange}
                />
                Has visited before?
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || aadharError}
            className={isLoading ? "loading" : ""}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Booking...
              </>
            ) : (
              "Book Appointment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAppointmentForm;