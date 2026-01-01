import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Agency from '../models/Agency.js';

// Generate JWT token
const generateToken = userId => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );
};

// Register new user
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || 'user',
      phone
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).populate('agencyId');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is inactive' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        agencyId: user.agencyId,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionValid: user.isSubscriptionValid()
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Register agency (combined user + agency)
export const registerAgency = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      agencyName,
      agencyEmail,
      agencyPhone,
      agencyAddress,
      subscriptionPlan = 'basic',
      billingCycle = 'monthly'
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      role: 'agency',
      phone,
      subscriptionPlan
    });

    // Set subscription dates
    const startDate = new Date();
    const endDate = new Date();

    if (billingCycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    user.subscriptionStartDate = startDate;
    user.subscriptionEndDate = endDate;

    await user.save();

    // Create agency
    const agency = new Agency({
      agencyName,
      owner: user._id,
      email: agencyEmail || email,
      phone: agencyPhone || phone,
      address: agencyAddress,
      subscription: {
        planName: subscriptionPlan,
        startDate,
        endDate,
        billingCycle,
        storageLimit:
          subscriptionPlan === 'basic'
            ? 1073741824 // 1GB
            : subscriptionPlan === 'pro'
            ? 5368709120 // 5GB
            : 10737418240, // 10GB
        listingLimit:
          subscriptionPlan === 'basic'
            ? 10
            : subscriptionPlan === 'pro'
            ? 50
            : 200
      }
    });

    await agency.save();

    // Update user with agencyId
    user.agencyId = agency._id;
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Agency registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        agencyId: agency._id
      },
      agency: {
        id: agency._id,
        name: agency.agencyName
      }
    });
  } catch (error) {
    console.error('Agency register error:', error);
    res
      .status(500)
      .json({ message: 'Server error during agency registration' });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('agencyId');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        ...user.toObject(),
        subscriptionValid: user.isSubscriptionValid()
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};