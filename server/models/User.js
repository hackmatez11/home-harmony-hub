const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'agency', 'broker', 'admin'],
    default: 'user'
  },
  phone: {
    type: String,
    trim: true
  },
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency'
  },
  subscriptionPlan: {
    type: String,
    enum: ['basic', 'pro', 'enterprise', 'none'],
    default: 'none'
  },
  subscriptionStartDate: {
    type: Date
  },
  subscriptionEndDate: {
    type: Date
  },
  storageUsed: {
    type: Number,
    default: 0 // in bytes
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profileImage: {
    type: String
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if subscription is valid
userSchema.methods.isSubscriptionValid = function() {
  if (!this.subscriptionEndDate) return false;
  return new Date() < this.subscriptionEndDate;
};

module.exports = mongoose.model('User', userSchema);
