import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['apartment', 'house', 'villa', 'condo', 'townhouse', 'land', 'commercial', 'office']
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  googleMapsLink: {
    type: String
  },
  images: [{
    url: String,
    size: Number, // bytes
    publicId: String
  }],
  bedrooms: {
    type: Number,
    default: 0
  },
  bathrooms: {
    type: Number,
    default: 0
  },
  area: {
    value: Number,
    unit: {
      type: String,
      enum: ['sqft', 'sqm'],
      default: 'sqft'
    }
  },
  furnished: {
    type: String,
    enum: ['furnished', 'semi-furnished', 'unfurnished'],
    default: 'unfurnished'
  },
  availability: {
    type: String,
    enum: ['available', 'sold', 'rented', 'unavailable'],
    default: 'available'
  },
  listingType: {
    type: String,
    enum: ['sale', 'rent'],
    required: true
  },
  features: [{
    type: String
  }],
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: true
  },
  brokerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contactDetails: {
    name: String,
    phone: String,
    email: String,
    whatsapp: String
  },
  socialLinks: {
    instagram: String,
    whatsapp: String,
    website: String
  },
  views: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
propertySchema.index({ title: 'text', description: 'text' });
propertySchema.index({ 'location.city': 1, propertyType: 1, price: 1 });
propertySchema.index({ agencyId: 1, availability: 1 });

// Virtual: Total image size
propertySchema.virtual('totalImageSize').get(function () {
  return this.images.reduce((total, img) => total + (img.size || 0), 0);
});

const Property = mongoose.model('Property', propertySchema);
export default Property;
