import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-full border-2 border-amber-100 bg-amber-600/20 text-amber-100 hover:bg-amber-600/40 transition-all duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

