import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import "./AppointmentManagement.css";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/getall`,
        { withCredentials: true }
      );
      // Sort appointments by date (newest first)
      const sortedAppointments = (data.appointments || []).sort((a, b) => 
        new Date(b.appointment_date) - new Date(a.appointment_date)
      );
      setAppointments(sortedAppointments);
    } catch (error) {
      toast.error("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/delete/${appointmentId}`,
          { withCredentials: true }
        );
        toast.success("Appointment deleted successfully");
        setExpandedAppointment(null); // Close expanded view if deleting current
        fetchAppointments();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to delete appointment.");
      }
    }
  };

  const handleView = (appointment) => {
    if (expandedAppointment?._id === appointment._id && !isEditing) {
      setExpandedAppointment(null); // Collapse if same appointment clicked
    } else {
      setExpandedAppointment(appointment);
      setIsEditing(false); // Ensure we're in view mode
    }
  };

  const handleEdit = (appointment) => {
    setExpandedAppointment(appointment);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/update/${expandedAppointment._id}`,
        expandedAppointment,
        { withCredentials: true }
      );
      toast.success("Appointment updated successfully");
      setIsEditing(false);
      fetchAppointments();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update appointment.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpandedAppointment({
      ...expandedAppointment,
      [name]: value
    });
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      `${appointment.firstName} ${appointment.lastName} ${appointment.department}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading appointments...</div>;

  return (
    <div className="appointment-management-container">
      <h2>Appointment Management</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="appointments-table">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <React.Fragment key={appointment._id}>
                  <tr>
                    <td>{appointment.firstName} {appointment.lastName}</td>
                    <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                    <td>Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button 
                        className="view-btn"
                        onClick={() => handleView(appointment)}
                      >
                        <FaEye /> View
                      </button>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(appointment)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(appointment._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                  {expandedAppointment?._id === appointment._id && (
                    <tr className="expanded-row">
                      <td colSpan="6">
                        <div className="appointment-details">
                          {isEditing ? (
                            <div className="edit-form">
                              <div className="form-group">
                                <label>First Name:</label>
                                <input
                                  type="text"
                                  name="firstName"
                                  value={expandedAppointment.firstName}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Last Name:</label>
                                <input
                                  type="text"
                                  name="lastName"
                                  value={expandedAppointment.lastName}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Date:</label>
                                <input
                                  type="datetime-local"
                                  name="appointment_date"
                                  value={new Date(expandedAppointment.appointment_date).toISOString().slice(0, 16)}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Department:</label>
                                <input
                                  type="text"
                                  name="department"
                                  value={expandedAppointment.department}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Status:</label>
                                <select
                                  name="status"
                                  value={expandedAppointment.status}
                                  onChange={handleInputChange}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Cancelled">Cancelled</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </div>
                              <div className="form-actions">
                                <button 
                                  className="cancel-btn"
                                  onClick={handleCancelEdit}
                                >
                                  <FaTimes /> Cancel
                                </button>
                                <button 
                                  className="save-btn"
                                  onClick={handleUpdate}
                                >
                                  <FaCheck /> Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="view-mode">
                              <div className="detail-row">
                                <span className="detail-label">Patient:</span>
                                <span className="detail-value">
                                  {expandedAppointment.firstName} {expandedAppointment.lastName}
                                </span>
                              </div>
                              <div className="detail-row">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">{expandedAppointment.email}</span>
                              </div>
                              <div className="detail-row">
                                <span className="detail-label">Phone:</span>
                                <span className="detail-value">{expandedAppointment.phone}</span>
                              </div>
                              <div className="detail-row">
                                <span className="detail-label">Date:</span>
                                <span className="detail-value">
                                  {new Date(expandedAppointment.appointment_date).toLocaleString()}
                                </span>
                              </div>
                              <div className="detail-row">
                                <span className="detail-label">Doctor:</span>
                                <span className="detail-value">
                                  Dr. {expandedAppointment.doctor?.firstName} {expandedAppointment.doctor?.lastName}
                                </span>
                              </div>
                              <div className="detail-row">
                                <span className="detail-label">Department:</span>
                                <span className="detail-value">{expandedAppointment.department}</span>
                              </div>
                              <div className="detail-row">
                                <span className="detail-label">Status:</span>
                                <span className={`detail-value status-badge ${expandedAppointment.status.toLowerCase()}`}>
                                  {expandedAppointment.status}
                                </span>
                              </div>
                              <div className="detail-row">
                                <span className="detail-label">Notes:</span>
                                <span className="detail-value">{expandedAppointment.notes || "N/A"}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-appointments">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManagement;