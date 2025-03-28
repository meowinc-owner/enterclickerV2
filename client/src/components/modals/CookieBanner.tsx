import { useState, useEffect } from 'react';
import { useGame } from '../../hooks/useGame';

export default function CookieBanner() {
  const { cookiesAccepted, acceptCookies, declineCookies } = useGame();
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    // Check if cookie state is already set
    const cookieState = localStorage.getItem('cookiesAccepted');
    if (cookieState === null) {
      // Only show banner if cookie state isn't set yet
      setShow(true);
    } else {
      setShow(false);
    }
  }, [cookiesAccepted]);
  
  if (!show) return null;
  
  const handleAccept = () => {
    acceptCookies();
    setShow(false);
  };
  
  const handleDecline = () => {
    declineCookies();
    setShow(false);
  };
  
  return (
    <div className="cookie-banner fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-indigo-100 p-4 shadow-lg z-50 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="cookie-text text-neutral-700 text-sm">
        <p>This website uses cookies to enhance user experience and to analyze performance and traffic on our website. By clicking "Accept", you consent to our use of cookies.</p>
      </div>
      <div className="cookie-buttons flex gap-3">
        <button 
          onClick={handleDecline}
          className="px-4 py-2 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg text-neutral-700 text-sm font-medium transition-all duration-200"
        >
          Decline
        </button>
        <button 
          onClick={handleAccept}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg text-sm font-medium shadow-btn hover:shadow-btn-hover transition-all duration-200"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
