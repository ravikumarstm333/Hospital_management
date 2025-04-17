import "./Dashboard.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const { isAuthenticated, admin } = useContext(Context);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/getall`,
        { withCredentials: true }
      );
      
      // Sort appointments by date (newest first)
      const sortedAppointments = (data.appointments || []).sort((a, b) => {
        return new Date(b.appointment_date) - new Date(a.appointment_date);
      });
      
      setAppointments(sortedAppointments);
    } catch (error) {
      toast.error("Failed to fetch appointments.");
      setAppointments([]);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );

      toast.success(
        status === "Confirmed"
          ? "Appointment confirmed and email sent!"
          : data.message || "Status updated successfully!"
      );

      // Update frontend UI
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status } : appt
        )
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status.");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="src/photoes/logo.png" alt="logo" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
            </div>
            <p>Our trust, your responsibility</p>
          </div>
        </div>

        <div className="secondBox">
          <p>Appointment Overview</p>
          <h3>{appointments?.length}</h3>
        </div>
      </div>

      <div className="banner">
        <h3 className="centered-heading">Appointments</h3>
      </div>
      <div className="banner">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>
                    {appointment.firstName} {appointment.lastName}
                  </td>
                  <td>
                    {appointment.appointment_date
                      ? appointment.appointment_date.substring(0, 16)
                      : "N/A"}
                  </td>
                  <td>
                    {appointment.doctor?.firstName || "N/A"}{" "}
                    {appointment.doctor?.lastName || ""}
                  </td>
                  <td>{appointment.department || "N/A"}</td>
                  <td>
                    <select
                      className={
                        appointment.status === "Pending"
                          ? "value-pending"
                          : appointment.status === "Confirmed"
                          ? "value-confirmed"
                          : appointment.status === "Cancelled"
                          ? "value-cancelled"
                          : "value-default"
                      }
                      value={appointment.status || "Pending"}
                      onChange={(e) =>
                        handleUpdateStatus(appointment._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Appointments Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;