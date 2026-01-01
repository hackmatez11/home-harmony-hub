export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    mapLink?: string;
  };
  type: 'apartment' | 'villa' | 'house' | 'plot' | 'commercial' | 'penthouse';
  status: 'available' | 'sold' | 'unavailable' | 'pending';
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    areaUnit: 'sqft' | 'sqm';
    furnished: boolean;
    parking: boolean;
    yearBuilt?: number;
  };
  images: string[];
  contact: {
    name: string;
    phone: string;
    email: string;
    whatsapp?: string;
    instagram?: string;
    website?: string;
  };
  agency: {
    id: string;
    name: string;
    logo?: string;
  };
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  views: number;
}

export interface Agency {
  id: string;
  name: string;
  email: string;
  phone: string;
  logo?: string;
  description?: string;
  website?: string;
  subscription: {
    plan: 'basic' | 'pro' | 'enterprise';
    status: 'active' | 'expired' | 'cancelled';
    expiresAt: string;
    storageUsed: number;
    storageLimit: number;
    listingsUsed: number;
    listingsLimit: number;
  };
  properties: string[];
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'agency' | 'admin';
  avatar?: string;
  agencyId?: string;
  savedProperties: string[];
  preferences: {
    language: string;
    notifications: boolean;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  storageLimit: number;
  listingsLimit: number;
  features: string[];
  highlighted?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  propertyCards?: Property[];
}

export interface FilterOptions {
  priceMin?: number;
  priceMax?: number;
  location?: string;
  type?: Property['type'][];
  bedrooms?: number;
  furnished?: boolean;
  status?: Property['status'];
  agency?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
}

export type Language = 'en' | 'es' | 'fr' | 'ar' | 'zh';
