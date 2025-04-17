import { useEffect } from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  useEffect(() => {
    const createParticles = () => {
      const heroSection = document.querySelector(".appointment-hero");
      if (!heroSection) return;

      const particles = [];
      const colors = [
        "rgba(255, 255, 255, 0.8)",
        "rgba(255, 255, 255, 0.6)",
        "rgba(255, 255, 255, 0.4)"
      ];
      
      for (let i = 0; i < 15; i++) { // Reduced number of particles
        const particle = document.createElement("div");
        particle.className = "particle";
        
        const size = Math.random() * 8 + 3; // Smaller particles
        const posX = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 10 + Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.bottom = `-50px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.background = color;
        
        heroSection.appendChild(particle);
        particles.push(particle);
      }
      
      return () => {
        particles.forEach(p => p.remove());
      };
    };

    // Add slight delay to ensure DOM is loaded
    const timer = setTimeout(createParticles, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="appointment-page">
      <Hero
        title={"PrimeCare,Appointment"}
        imageUrl={"/photoes/docmen.png"}
        className="appointment-hero"
      />
      <div className="appointment-form-section">
        <div className="form-container">
          <AppointmentForm/>
        </div>
        
        {/* Floating medical icons - using proper medical icons */}
        <i className="medical-icon fas fa-heartbeat"></i>
        <i className="medical-icon fas fa-hospital"></i>
      </div>
    </div>
  );
};

export default Appointment;