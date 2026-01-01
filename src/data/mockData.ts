import { Property, Agency, SubscriptionPlan } from '@/types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse with Ocean View',
    description: 'Stunning penthouse featuring panoramic ocean views, modern finishes, and private rooftop terrace. This exceptional residence offers the ultimate in luxury living with floor-to-ceiling windows, chef\'s kitchen, and smart home technology throughout.',
    price: 2500000,
    currency: 'USD',
    location: {
      address: '123 Ocean Drive',
      city: 'Miami Beach',
      state: 'Florida',
      country: 'USA',
      coordinates: { lat: 25.7617, lng: -80.1918 },
      mapLink: 'https://maps.google.com/?q=25.7617,-80.1918'
    },
    type: 'penthouse',
    status: 'available',
    features: {
      bedrooms: 4,
      bathrooms: 4,
      area: 4500,
      areaUnit: 'sqft',
      furnished: true,
      parking: true,
      yearBuilt: 2023
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    contact: {
      name: 'Sarah Johnson',
      phone: '+1 (305) 555-0123',
      email: 'sarah@luxuryestates.com',
      whatsapp: '+13055550123',
      instagram: '@luxuryestates'
    },
    agency: {
      id: 'a1',
      name: 'Luxury Estates Miami',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    featured: true,
    views: 1250
  },
  {
    id: '2',
    title: 'Modern Downtown Apartment',
    description: 'Sleek and sophisticated apartment in the heart of downtown. Features include open-concept living, gourmet kitchen, and stunning city views. Walking distance to restaurants, shops, and entertainment.',
    price: 750000,
    currency: 'USD',
    location: {
      address: '456 Main Street',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    type: 'apartment',
    status: 'available',
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      areaUnit: 'sqft',
      furnished: false,
      parking: true,
      yearBuilt: 2021
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    contact: {
      name: 'Michael Chen',
      phone: '+1 (213) 555-0456',
      email: 'michael@cityrealty.com'
    },
    agency: {
      id: 'a2',
      name: 'City Realty LA'
    },
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
    featured: true,
    views: 890
  },
  {
    id: '3',
    title: 'Charming Victorian Villa',
    description: 'Beautifully restored Victorian villa with original architectural details, modern amenities, and a lush garden. Perfect blend of historic charm and contemporary comfort.',
    price: 1850000,
    currency: 'USD',
    location: {
      address: '789 Heritage Lane',
      city: 'San Francisco',
      state: 'California',
      country: 'USA'
    },
    type: 'villa',
    status: 'available',
    features: {
      bedrooms: 5,
      bathrooms: 3,
      area: 3800,
      areaUnit: 'sqft',
      furnished: false,
      parking: true,
      yearBuilt: 1895
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'
    ],
    contact: {
      name: 'Emily Parker',
      phone: '+1 (415) 555-0789',
      email: 'emily@heritagehouses.com',
      website: 'https://heritagehouses.com'
    },
    agency: {
      id: 'a3',
      name: 'Heritage Houses SF'
    },
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-15T16:00:00Z',
    featured: false,
    views: 567
  },
  {
    id: '4',
    title: 'Waterfront Family Home',
    description: 'Spacious family home with private dock, pool, and breathtaking water views. Open floor plan perfect for entertaining, with a gourmet kitchen and luxurious master suite.',
    price: 3200000,
    currency: 'USD',
    location: {
      address: '101 Harbor View',
      city: 'Naples',
      state: 'Florida',
      country: 'USA'
    },
    type: 'house',
    status: 'available',
    features: {
      bedrooms: 6,
      bathrooms: 5,
      area: 5500,
      areaUnit: 'sqft',
      furnished: true,
      parking: true,
      yearBuilt: 2020
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'
    ],
    contact: {
      name: 'Robert Williams',
      phone: '+1 (239) 555-0101',
      email: 'robert@waterfrontliving.com',
      whatsapp: '+12395550101'
    },
    agency: {
      id: 'a1',
      name: 'Luxury Estates Miami'
    },
    createdAt: '2024-01-08T12:00:00Z',
    updatedAt: '2024-01-22T09:00:00Z',
    featured: true,
    views: 1450
  },
  {
    id: '5',
    title: 'Prime Commercial Space',
    description: 'High-visibility commercial property in prime retail location. Features modern build-out, ample parking, and excellent foot traffic. Ideal for retail or professional services.',
    price: 950000,
    currency: 'USD',
    location: {
      address: '555 Commerce Blvd',
      city: 'Austin',
      state: 'Texas',
      country: 'USA'
    },
    type: 'commercial',
    status: 'available',
    features: {
      bedrooms: 0,
      bathrooms: 2,
      area: 3000,
      areaUnit: 'sqft',
      furnished: false,
      parking: true,
      yearBuilt: 2019
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    contact: {
      name: 'David Martinez',
      phone: '+1 (512) 555-0555',
      email: 'david@commercialpro.com'
    },
    agency: {
      id: 'a4',
      name: 'Commercial Pro Austin'
    },
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
    featured: false,
    views: 320
  },
  {
    id: '6',
    title: 'Mountain View Plot',
    description: 'Stunning 5-acre lot with panoramic mountain views. Perfect for building your dream home. Utilities available at property line, paved road access.',
    price: 450000,
    currency: 'USD',
    location: {
      address: 'Lot 23 Mountain Ridge',
      city: 'Aspen',
      state: 'Colorado',
      country: 'USA'
    },
    type: 'plot',
    status: 'available',
    features: {
      bedrooms: 0,
      bathrooms: 0,
      area: 217800,
      areaUnit: 'sqft',
      furnished: false,
      parking: false
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    contact: {
      name: 'Jennifer Adams',
      phone: '+1 (970) 555-0023',
      email: 'jennifer@mountainlands.com'
    },
    agency: {
      id: 'a5',
      name: 'Mountain Lands Realty'
    },
    createdAt: '2024-01-03T11:00:00Z',
    updatedAt: '2024-01-17T13:00:00Z',
    featured: false,
    views: 445
  }
];

export const mockAgencies: Agency[] = [
  {
    id: 'a1',
    name: 'Luxury Estates Miami',
    email: 'info@luxuryestates.com',
    phone: '+1 (305) 555-0100',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
    description: 'Premier luxury real estate agency specializing in waterfront properties and high-end residences in South Florida.',
    website: 'https://luxuryestates.com',
    subscription: {
      plan: 'enterprise',
      status: 'active',
      expiresAt: '2025-01-15T00:00:00Z',
      storageUsed: 15.5,
      storageLimit: 100,
      listingsUsed: 45,
      listingsLimit: -1
    },
    properties: ['1', '4'],
    createdAt: '2022-06-01T00:00:00Z'
  },
  {
    id: 'a2',
    name: 'City Realty LA',
    email: 'contact@cityrealtyla.com',
    phone: '+1 (213) 555-0400',
    description: 'Your trusted partner for urban living in Los Angeles.',
    subscription: {
      plan: 'pro',
      status: 'active',
      expiresAt: '2024-06-30T00:00:00Z',
      storageUsed: 8.2,
      storageLimit: 20,
      listingsUsed: 18,
      listingsLimit: 50
    },
    properties: ['2'],
    createdAt: '2023-01-15T00:00:00Z'
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 49,
    annualPrice: 470,
    storageLimit: 5,
    listingsLimit: 10,
    features: [
      'Up to 10 property listings',
      '5 GB storage for images',
      'Basic analytics',
      'Email support',
      'Standard listing visibility'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 99,
    annualPrice: 950,
    storageLimit: 20,
    listingsLimit: 50,
    features: [
      'Up to 50 property listings',
      '20 GB storage for images',
      'Advanced analytics & reports',
      'Priority email & chat support',
      'Featured listings boost',
      'Social media integration',
      'Custom branding'
    ],
    highlighted: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 249,
    annualPrice: 2390,
    storageLimit: 100,
    listingsLimit: -1,
    features: [
      'Unlimited property listings',
      '100 GB storage for images',
      'Enterprise analytics suite',
      '24/7 dedicated support',
      'Premium listing placement',
      'API access',
      'White-label options',
      'Team collaboration tools',
      'Custom integrations'
    ]
  }
];

export const translations = {
  en: {
    common: {
      search: 'Search',
      filter: 'Filter',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      viewDetails: 'View Details',
      contact: 'Contact',
      price: 'Price',
      location: 'Location',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Area',
      type: 'Type',
      status: 'Status',
      available: 'Available',
      sold: 'Sold',
      pending: 'Pending'
    },
    home: {
      heroTitle: 'Find Your Dream Property',
      heroSubtitle: 'Discover thousands of properties from trusted agencies worldwide',
      searchPlaceholder: 'Search by location, property type...',
      featuredProperties: 'Featured Properties',
      browseAll: 'Browse All Properties',
      whyChooseUs: 'Why Choose Us',
      trustedAgencies: 'Trusted Agencies',
      propertiesListed: 'Properties Listed',
      happyClients: 'Happy Clients'
    },
    chatbot: {
      title: 'Property Assistant',
      placeholder: 'Ask me about properties...',
      welcome: 'Hello! I\'m your AI property assistant. How can I help you find your perfect home today?'
    },
    voicebot: {
      title: 'Voice Search',
      listening: 'Listening...',
      speak: 'Tap to speak',
      processing: 'Processing...'
    }
  },
  es: {
    common: {
      search: 'Buscar',
      filter: 'Filtrar',
      login: 'Iniciar Sesión',
      signup: 'Registrarse',
      logout: 'Cerrar Sesión',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      viewDetails: 'Ver Detalles',
      contact: 'Contactar',
      price: 'Precio',
      location: 'Ubicación',
      bedrooms: 'Habitaciones',
      bathrooms: 'Baños',
      area: 'Área',
      type: 'Tipo',
      status: 'Estado',
      available: 'Disponible',
      sold: 'Vendido',
      pending: 'Pendiente'
    },
    home: {
      heroTitle: 'Encuentra Tu Propiedad Ideal',
      heroSubtitle: 'Descubre miles de propiedades de agencias confiables en todo el mundo',
      searchPlaceholder: 'Buscar por ubicación, tipo de propiedad...',
      featuredProperties: 'Propiedades Destacadas',
      browseAll: 'Ver Todas las Propiedades',
      whyChooseUs: 'Por Qué Elegirnos',
      trustedAgencies: 'Agencias Confiables',
      propertiesListed: 'Propiedades Listadas',
      happyClients: 'Clientes Felices'
    },
    chatbot: {
      title: 'Asistente de Propiedades',
      placeholder: 'Pregúntame sobre propiedades...',
      welcome: '¡Hola! Soy tu asistente de propiedades IA. ¿Cómo puedo ayudarte a encontrar tu hogar perfecto hoy?'
    },
    voicebot: {
      title: 'Búsqueda por Voz',
      listening: 'Escuchando...',
      speak: 'Toca para hablar',
      processing: 'Procesando...'
    }
  }
};
