const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  agencyName: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  logo: {
    type: String
  },
  website: {
    type: String
  },
  socialLinks: {
    instagram: String,
    whatsapp: String,
    facebook: String,
    linkedin: String
  },
  subscription: {
    planName: {
      type: String,
      enum: ['basic', 'pro', 'enterprise'],
      default: 'basic'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    },
    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly'
    },
    storageLimit: {
      type: Number,
      default: 1073741824 // 1GB in bytes
    },
    listingLimit: {
      type: Number,
      default: 10
    }
  },
  storageUsed: {
    type: Number,
    default: 0
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Method to check if subscription is valid
agencySchema.methods.isSubscriptionValid = function() {
  if (!this.subscription.endDate) return false;
  return new Date() < this.subscription.endDate;
};

// Method to check if storage limit is exceeded
agencySchema.methods.hasStorageAvailable = function(additionalSize) {
  return (this.storageUsed + additionalSize) <= this.subscription.storageLimit;
};

// Method to check if listing limit is reached
agencySchema.methods.canAddListing = function() {
  return this.properties.length < this.subscription.listingLimit;
};

module.exports = mongoose.model('Agency', agencySchema);
