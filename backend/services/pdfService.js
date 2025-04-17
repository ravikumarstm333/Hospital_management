// backend/services/pdfService.js

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// Constants for styling
const COLORS = {
  primary: "#2E86C1",
  secondary: "#555555",
  success: "#28B463",
  warning: "#D4AC0D",
  danger: "#CB4335"
};

const FONTS = {
  header: "Helvetica-Bold",
  subheader: "Helvetica-Bold",
  body: "Helvetica",
  bold: "Helvetica-Bold"
};

export const generateAppointmentPDF = async (appointment) => {
  return new Promise((resolve, reject) => {
    try {
      // File setup
      const fileName = `Appointment_${appointment._id}_${Date.now()}.pdf`;
      const pdfsDir = path.join("backend", "public", "pdfs");
      const filePath = path.join(pdfsDir, fileName);

      // Ensure directory exists
      if (!fs.existsSync(pdfsDir)) {
        fs.mkdirSync(pdfsDir, { recursive: true });
      }

      // Initialize PDF document
      const doc = new PDFDocument({
        margin: 50,
        size: "A4",
        info: {
          Title: `Appointment Confirmation - ${appointment._id}`,
          Author: "Hospital Management System"
        }
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Header with logo and title
      drawHeader(doc, appointment);
      
      // Patient and doctor information section
      drawInformationSection(doc, appointment);
      
      // Appointment details section
      drawDetailsSection(doc, appointment);
      
      // Footer with contact information
      drawFooter(doc);

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", (err) => reject(err));

    } catch (err) {
      reject(new Error(`PDF generation failed: ${err.message}`));
    }
  });
};

// Helper functions for drawing PDF sections
function drawHeader(doc, appointment) {
  // Hospital logo placeholder (you can replace with actual image)
  doc
    .fillColor(COLORS.primary)
    .font(FONTS.header)
    .fontSize(24)
    .text("Prime Care Hospital", { align: "center" });
    
  doc
    .fontSize(16)
    .text("Appointment Confirmation", { align: "center" });
    
  doc
    .moveTo(50, 120)
    .lineTo(550, 120)
    .lineWidth(2)
    .stroke(COLORS.primary);
    
  doc.moveDown(2);
}

function drawInformationSection(doc, appointment) {
  // Patient Information Box
  doc
    .roundedRect(50, 150, 500, 80, 5)
    .fill("#F2F4F4");
    
  doc
    .fillColor("black")
    .font(FONTS.subheader)
    .fontSize(14)
    .text("Patient Information", 60, 160);
    
  doc
    .font(FONTS.body)
    .fontSize(12)
    .text(`Name: ${appointment.firstName} ${appointment.lastName}`, 60, 185)
    .text(`Contact: ${appointment.phone || 'N/A'}`, 60, 200)
    .text(`Email: ${appointment.email || 'N/A'}`, 300, 185)
    .text(`Address: ${appointment.address || 'N/A'}`, 300, 200);
    
  // Doctor Information Box
  doc
    .roundedRect(50, 250, 500, 80, 5)
    .fill("#F2F4F4");
    
  doc
    .fillColor("black")
    .font(FONTS.subheader)
    .fontSize(14)
    .text("Doctor Information", 60, 260);
    
  doc
    .font(FONTS.body)
    .fontSize(12)
    .text(`Name: Dr. ${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`, 60, 285)
    .text(`Department: ${appointment.department}`, 60, 300)
    .text(`Specialization: ${appointment.doctorId.specialization || 'N/A'}`, 300, 285);
}

function drawDetailsSection(doc, appointment) {
  // Appointment Details Box
  doc
    .roundedRect(50, 350, 500, 120, 5)
    .fill("#EBF5FB")
    .stroke(COLORS.primary);
    
  doc
    .fillColor(COLORS.primary)
    .font(FONTS.subheader)
    .fontSize(16)
    .text("Appointment Details", 60, 360);
    
  doc
    .fillColor("black")
    .font(FONTS.body)
    .fontSize(12);
    
  const statusColor = appointment.status === "confirmed" ? COLORS.success : 
                      appointment.status === "pending" ? COLORS.warning : COLORS.danger;
    
  doc
    .text(`Date: ${formatDate(appointment.appointment_date)}`, 60, 390)
    .text(`Time: ${appointment.timeSlot || 'To be confirmed'}`, 60, 405)
    .text(`Reference ID: ${appointment._id}`, 60, 420)
    .text(`Status: `, 300, 390)
    .fill(statusColor)
    .text(appointment.status.toUpperCase(), 350, 390)
    .fill("black")
    .text(`Notes: ${appointment.notes || 'None'}`, 300, 405);
}

function drawFooter(doc) {
  doc
    .moveTo(50, 550)
    .lineTo(550, 550)
    .lineWidth(1)
    .stroke("#AAAAAA");
    
  doc
    .fillColor(COLORS.secondary)
    .font(FONTS.body)
    .fontSize(10)
    .text("For any questions or changes to your appointment, please contact:", 50, 560, { align: "center" })
    .text("(7061042974| ✉ ravikumarstm333@gmail.com | www.primecare.com", 50, 575, { align: "center" })
    .text("© 2025 Prime Care Hospital. All rights reserved.", 50, 590, { align: "center" });
}

function formatDate(dateString) {
  if (!dateString) return "To be confirmed";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}