"use client";
import React, { useState, useEffect } from 'react';

const WhatsAppButton = ({ 
  phoneNumber = "+918080806288",
  message = "Hello! I'm interested in your services.",
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [isOfficeOpen, setIsOfficeOpen] = useState(true);

  // Function to check office hours and set URL
  useEffect(() => {
    const updateWhatsAppLink = () => {
      const now = new Date();
      const options = { timeZone: "Asia/Kolkata" };
      const indiaTime = new Date(now.toLocaleString("en-US", options));
      
      const day = indiaTime.getDay();
      const hour = indiaTime.getHours();
      
      const isOfficeDay = day >= 1 && day <= 6;
      const isWithinTime = hour >= 9 && hour < 20;
      const officeOpen = isOfficeDay && isWithinTime;
      
      setIsOfficeOpen(officeOpen);
      
      if (officeOpen) {
        const cleanNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
        const encodedMessage = encodeURIComponent(message);
        setWhatsappUrl(`https://wa.me/${cleanNumber}?text=${encodedMessage}`);
      } else {
        setWhatsappUrl(''); // No URL when closed
      }
    };

    updateWhatsAppLink();
    const interval = setInterval(updateWhatsAppLink, 60000);
    return () => clearInterval(interval);
  }, [phoneNumber, message]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap animate-fadeIn shadow-lg">
          {whatsappUrl ? "Chat with us on WhatsApp" : "Office closed now (9 AM - 8 PM, Mon-Sat)"}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
      
      {/* WhatsApp Button */}
      {whatsappUrl ? (
        /* Clickable link when office is open */
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center animate-pulse-subtle"
          aria-label="Contact us on WhatsApp"
        >
          <svg className="w-9 h-9 text-white transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
          </svg>
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-300"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
        </a>
      ) : (
        /* Non-clickable div when office is closed */
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-16 h-16 bg-gray-400 rounded-full shadow-lg flex items-center justify-center opacity-60 cursor-not-allowed"
          style={{ filter: "grayscale(100%)" }}
          aria-label="Office closed - Contact us during working hours"
        >
          <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
          </svg>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;
