import api from './api';
import { Property, PropertyFilters } from '@/types';

export const propertyService = {
  async getAll(filters?: PropertyFilters) {
    const { data } = await api.get('/properties', { params: filters });
    return data;
  },

  async getById(id: string) {
    const { data } = await api.get(`/properties/${id}`);
    return data.property;
  },

  async create(propertyData: FormData) {
    const { data } = await api.post('/properties', propertyData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.property;
  },

  async update(id: string, propertyData: FormData) {
    const { data } = await api.put(`/properties/${id}`, propertyData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.property;
  },

  async delete(id: string) {
    const { data } = await api.delete(`/properties/${id}`);
    return data;
  },

  async getMyProperties() {
    const { data } = await api.get('/properties/agency/my-properties');
    return data;
  }
};

export const agencyService = {
  async getProfile() {
    const { data } = await api.get('/agencies/profile');
    return data.agency;
  },

  async updateProfile(agencyData: FormData) {
    const { data } = await api.put('/agencies/profile', agencyData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.agency;
  },

  async getDashboardStats() {
    const { data } = await api.get('/agencies/dashboard/stats');
    return data.stats;
  },

  async getAll(params?: any) {
    const { data } = await api.get('/agencies/all', { params });
    return data;
  },

  async getById(id: string) {
    const { data } = await api.get(`/agencies/public/${id}`);
    return data.agency;
  }
};

export const subscriptionService = {
  async getPlans() {
    const { data } = await api.get('/subscriptions/plans');
    return data.plans;
  },

  async getPlan(planName: string) {
    const { data} = await api.get(`/subscriptions/plans/${planName}`);
    return data.plan;
  },

  async subscribe(subscriptionData: any) {
    const { data } = await api.post('/subscriptions/subscribe', subscriptionData);
    return data;
  },

  async getStatus() {
    const { data } = await api.get('/subscriptions/status');
    return data.subscription;
  },

  async cancel() {
    const { data } = await api.post('/subscriptions/cancel');
    return data;
  }
};

export const aiService = {
  async chatbot(message: string, conversationHistory?: any[], language?: string) {
    const { data } = await api.post('/ai/chatbot', {
      message,
      conversationHistory,
      language
    });
    return data;
  },

  async voiceBot(audioData: any, language?: string) {
    const { data } = await api.post('/ai/voicebot', {
      audioData,
      language
    });
    return data;
  }
};
