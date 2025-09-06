// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import jwt_decode from 'jwt-decode';
// // You'll need this package

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login'); // Redirect to login if no token
//     } else {
//       const decoded = jwt_decode(token); // Decode the token to get role
//       if (allowedRoles.includes(decoded.role)) {
//         setIsAuthorized(true);
//       } else {
//         navigate('/'); // Redirect to homepage if unauthorized
//       }
//     }
//   }, [navigate, allowedRoles]);

//   return isAuthorized ? children : null; // Only render children if authorized
// };

// export default ProtectedRoute;
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';  // Assuming you are using jwt-decode for token decoding

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');  // Redirect to login if no token
    } else {
      try {
        const decoded = jwt_decode(token);  // Decode the token to get role
        if (allowedRoles.includes(decoded.role)) {
          setIsAuthorized(true);
        } else {
          navigate('/');  // Redirect to homepage if unauthorized
        }
      } catch (err) {
        console.error("Invalid or expired token", err);
        localStorage.removeItem('token');  // Remove invalid token
        navigate('/login');  // Redirect to login if token is invalid or expired
      }
    }
  }, [navigate, allowedRoles]);

  return isAuthorized ? children : null;  // Only render children if authorized
};

export default ProtectedRoute;

