const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    const user = await User.findById(decoded.userId).select('-password');

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'User not found or inactive' });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required role: ${roles.join(' or ')}` 
      });
    }

    next();
  };
};

// Check subscription validity
const checkSubscription = async (req, res, next) => {
  try {
    if (req.user.role === 'user' || req.user.role === 'admin') {
      return next(); // Public users and admins don't need subscription
    }

    if (!req.user.isSubscriptionValid()) {
      return res.status(403).json({ 
        message: 'Subscription expired. Please renew your subscription.' 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking subscription' });
  }
};

module.exports = { auth, authorize, checkSubscription };
