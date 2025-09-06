import jwt from 'jsonwebtoken';

const protectRoute = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;

      // If the roles array is provided, check if the decoded role is valid
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

export default protectRoute; // <-- Use default export

