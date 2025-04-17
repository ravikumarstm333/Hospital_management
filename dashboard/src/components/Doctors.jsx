import "./Doctors.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/doctors`,
          { withCredentials: true }
        );
        setDoctors(data.doctors || []);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load doctors."
        );
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {doctors.length > 0 ? (
          doctors.map((element) => (
            <div className="card" key={element._id}>
              <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className="details">
                <p>
                  <span className="label">Email:</span>
                  <span className="value">{element.email}</span>
                </p>
                <p>
                  <span className="label">Phone:</span>
                  <span className="value">{element.phone}</span>
                </p>
                <p>
                  <span className="label">DOB:</span>
                  <span className="value">{element.dob?.substring(0, 10)}</span>
                </p>
                <p>
                  <span className="label">Department:</span>
                  <span className="value">{element.doctorDepartment}</span>
                </p>
                <p>
                  <span className="label">Aadhaar:</span> {/* Updated label */}
                  <span className="value">{element.aadharnumber}</span> {/* Updated key */}
                </p>
                <p>
                  <span className="label">Gender:</span>
                  <span className="value">{element.gender}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h2>No Registered Doctors Found!</h2>
        )}
      </div>
    </section>
  );
};

export default Doctors;
