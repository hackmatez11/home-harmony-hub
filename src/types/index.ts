export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'agency' | 'broker' | 'admin';
  phone?: string;
  agencyId?: string;
  subscriptionPlan?: string;
  subscriptionValid?: boolean;
  storageUsed?: number;
}

export interface Agency {
  _id: string;
  agencyName: string;
  owner: string;
  description?: string;
  email: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  logo?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
    linkedin?: string;
  };
  subscription: {
    planName: string;
    startDate: string;
    endDate: string;
    billingCycle: 'monthly' | 'yearly';
    storageLimit: number;
    listingLimit: number;
  };
  storageUsed: number;
  properties: string[];
  isActive: boolean;
  isVerified: boolean;
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  propertyType: 'apartment' | 'house' | 'villa' | 'condo' | 'townhouse' | 'land' | 'commercial' | 'office';
  location: {
    address: string;
    city: string;
    state?: string;
    zipCode?: string;
    country?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  googleMapsLink?: string;
  images: Array<{
    url: string;
    size: number;
    publicId: string;
  }>;
  bedrooms: number;
  bathrooms: number;
  area?: {
    value: number;
    unit: 'sqft' | 'sqm';
  };
  furnished: 'furnished' | 'semi-furnished' | 'unfurnished';
  availability: 'available' | 'sold' | 'rented' | 'unavailable';
  listingType: 'sale' | 'rent';
  features?: string[];
  agencyId: Agency;
  brokerId?: User;
  contactDetails?: {
    name?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  socialLinks?: {
    instagram?: string;
    whatsapp?: string;
    website?: string;
  };
  views: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlan {
  _id: string;
  planName: 'basic' | 'pro' | 'enterprise';
  displayName: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  storageLimit: number;
  listingLimit: number;
  features: string[];
  isActive: boolean;
}

export interface PropertyFilters {
  search?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  bedrooms?: number;
  furnished?: string;
  availability?: string;
  listingType?: string;
  agencyId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  totalViews: number;
  storageUsed: number;
  storageLimit: number;
  storageUsedPercent: number;
  listingCount: number;
  listingLimit: number;
  listingUsedPercent: number;
  subscriptionValid: boolean;
  subscriptionEndDate: string;
}
