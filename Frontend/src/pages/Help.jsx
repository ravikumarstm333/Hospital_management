import React from 'react';
import './Help.css';

const Help = () => {
  // Main hospital contact info
  const hospitalContacts = {
    email: 'help@primecarehospital.com',
    phone: '+91 7061042974',
    whatsapp: '+91 7061042974',
    emergency: '108',
    address: '123 Medical Street, Health City, 560001, India',
    workingHours: '24/7 Emergency | OPD: 8:00 AM - 8:00 PM'
  };

  // Common questions
  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can book appointments through our website, department or by calling our reception."
    },
    {
      question: "What documents do I need for book appointment?",
      answer: "Please bring your ID proof, insurance card (if applicable), and any previous medical records."
    },
    {
      question: "Do you have ambulance services?",
      answer: "Yes, we provide 24/7 ambulance services. Call our emergency number for immediate assistance."
    }
  ];

  return (
    <div className="help-container">
      <h1>Help & Support</h1>
      <p className="help-intro">We're available 24/7 to assist you with any medical needs or inquiries.</p>
      
      {/* Quick Contact Section */}
      <div className="quick-contact-section">
        <h2>Immediate Assistance</h2>
        <div className="contact-options">
          <div className="contact-card">
            <div className="contact-icon emergency-icon"></div>
            <h3>Emergency</h3>
            <p className="contact-number">{hospitalContacts.emergency}</p>
            <button className="quick-action emergency-btn" onClick={() => window.location.href = `tel:${hospitalContacts.emergency}`}>
              Call Emergency
            </button>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon phone-icon"></div>
            <h3>Hospital Reception</h3>
            <p className="contact-number">{hospitalContacts.phone}</p>
            <button className="quick-action" onClick={() => window.location.href = `tel:${hospitalContacts.phone}`}>
              Call Reception
            </button>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon whatsapp-icon"></div>
            <h3>WhatsApp Support</h3>
            <p className="contact-number">{hospitalContacts.whatsapp}</p>
            <button className="quick-action" onClick={() => window.open(`https://wa.me/${hospitalContacts.whatsapp}`, '_blank')}>
              Message on WhatsApp
            </button>
          </div>
        </div>
      </div>
      
      {/* Hospital Information Section */}
      <div className="hospital-info-section">
        <h2>Hospital Information</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Location</h3>
            <p>{hospitalContacts.address}</p>
            <button className="info-btn" onClick={() => window.open('https://maps.google.com?q=123+Medical+Street+Health+City')}>
              View on Map
            </button>
          </div>
          
          <div className="info-card">
            <h3>Working Hours</h3>
            <p>{hospitalContacts.workingHours}</p>
            <button className="info-btn" onClick={() => window.location.href = `tel:${hospitalContacts.phone}`}>
              Confirm Timings
            </button>
          </div>
          
          <div className="info-card">
            <h3>Email Support</h3>
            <p>{hospitalContacts.email}</p>
            <button className="info-btn" onClick={() => window.location.href = `mailto:${hospitalContacts.email}`}>
              Send Email
            </button>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <div key={index} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
        <button className="view-all-btn">View All FAQs</button>
      </div>
      
      {/* Additional Support Section */}
      <div className="support-section">
        <h2>Additional Support Options</h2>
        <div className="support-options">
          <div className="support-card">
            <h3>Live Chat</h3>
            <p>Chat with our support team in real-time</p>
            <button className="support-btn">Start Live Chat</button>
          </div>
          
          <div className="support-card">
            <h3>Feedback</h3>
            <p>Share your experience with us</p>
            <button className="support-btn">Submit Feedback</button>
          </div>
          
          <div className="support-card">
            <h3>Complaints</h3>
            <p>Register any complaints or concerns</p>
            <button className="support-btn">File Complaint</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;