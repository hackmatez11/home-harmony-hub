require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const User = require('../models/User');
const Agency = require('../models/Agency');
const Property = require('../models/Property');

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      SubscriptionPlan.deleteMany({}),
      Property.deleteMany({}),
      Agency.deleteMany({}),
      User.deleteMany({})
    ]);

    // Seed Subscription Plans
    console.log('💳 Creating subscription plans...');
    const plans = await SubscriptionPlan.insertMany([
      {
        planName: 'basic',
        displayName: 'Basic Plan',
        description: 'Perfect for individual brokers and small agencies',
        priceMonthly: 29,
        priceYearly: 290,
        storageLimit: 1073741824, // 1GB
        listingLimit: 10,
        features: [
          '10 property listings',
          '1GB storage',
          'Basic support',
          'Property search optimization',
          'Agency profile page'
        ]
      },
      {
        planName: 'pro',
        displayName: 'Professional Plan',
        description: 'Ideal for growing agencies with multiple agents',
        priceMonthly: 79,
        priceYearly: 790,
        storageLimit: 5368709120, // 5GB
        listingLimit: 50,
        features: [
          '50 property listings',
          '5GB storage',
          'Priority support',
          'Featured listings',
          'Advanced analytics',
          'Custom branding',
          'Lead management'
        ]
      },
      {
        planName: 'enterprise',
        displayName: 'Enterprise Plan',
        description: 'For large agencies and real estate networks',
        priceMonthly: 199,
        priceYearly: 1990,
        storageLimit: 10737418240, // 10GB
        listingLimit: 200,
        features: [
          '200 property listings',
          '10GB storage',
          '24/7 Premium support',
          'Unlimited featured listings',
          'Advanced analytics & reports',
          'Custom branding & domain',
          'API access',
          'Multi-agent management',
          'CRM integration'
        ]
      }
    ]);

    console.log('✅ Subscription plans created');

    // Seed Test Users and Agencies
    console.log('👤 Creating test users and agencies...');

    // Create a public user
    const publicUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
      phone: '+1234567890'
    });

    // Create Agency 1
    const agency1Owner = await User.create({
      name: 'Sarah Johnson',
      email: 'sarah@luxuryhomes.com',
      password: 'password123',
      role: 'agency',
      phone: '+1234567891',
      subscriptionPlan: 'pro',
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    });

    const agency1 = await Agency.create({
      agencyName: 'Luxury Homes Real Estate',
      owner: agency1Owner._id,
      description: 'Premier luxury real estate agency specializing in high-end properties',
      email: 'contact@luxuryhomes.com',
      phone: '+1234567891',
      address: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      website: 'https://luxuryhomes.com',
      socialLinks: {
        instagram: 'https://instagram.com/luxuryhomes',
        whatsapp: '+1234567891',
        facebook: 'https://facebook.com/luxuryhomes'
      },
      subscription: {
        planName: 'pro',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        billingCycle: 'yearly',
        storageLimit: 5368709120,
        listingLimit: 50
      },
      isVerified: true
    });

    agency1Owner.agencyId = agency1._id;
    await agency1Owner.save();

    // Create Agency 2
    const agency2Owner = await User.create({
      name: 'Mike Rodriguez',
      email: 'mike@urbanproperties.com',
      password: 'password123',
      role: 'agency',
      phone: '+1234567892',
      subscriptionPlan: 'basic',
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    const agency2 = await Agency.create({
      agencyName: 'Urban Properties Group',
      owner: agency2Owner._id,
      description: 'Affordable urban living spaces for modern lifestyles',
      email: 'info@urbanproperties.com',
      phone: '+1234567892',
      address: {
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA'
      },
      website: 'https://urbanproperties.com',
      socialLinks: {
        instagram: 'https://instagram.com/urbanproperties',
        whatsapp: '+1234567892'
      },
      subscription: {
        planName: 'basic',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        billingCycle: 'monthly',
        storageLimit: 1073741824,
        listingLimit: 10
      },
      isVerified: true
    });

    agency2Owner.agencyId = agency2._id;
    await agency2Owner.save();

    console.log('✅ Users and agencies created');

    // Seed Properties
    console.log('🏠 Creating sample properties...');

    const properties = [
      // Luxury Homes Properties
      {
        title: 'Luxury Penthouse with Manhattan Skyline Views',
        description: 'Stunning 3-bedroom penthouse featuring floor-to-ceiling windows, modern kitchen with high-end appliances, marble bathrooms, and a private terrace with breathtaking Manhattan skyline views. Located in the heart of New York City.',
        price: 2500000,
        propertyType: 'apartment',
        location: {
          address: '789 5th Avenue, Floor 45',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        googleMapsLink: 'https://maps.google.com/?q=New+York+NY',
        images: [],
        bedrooms: 3,
        bathrooms: 3,
        area: { value: 2500, unit: 'sqft' },
        furnished: 'furnished',
        availability: 'available',
        listingType: 'sale',
        features: ['Doorman', 'Gym', 'Pool', 'Parking', 'Pet Friendly', 'Balcony'],
        agencyId: agency1._id,
        brokerId: agency1Owner._id,
        contactDetails: {
          name: 'Sarah Johnson',
          phone: '+1234567891',
          email: 'sarah@luxuryhomes.com',
          whatsapp: '+1234567891'
        },
        socialLinks: {
          instagram: 'https://instagram.com/luxuryhomes',
          website: 'https://luxuryhomes.com'
        }
      },
      {
        title: 'Modern Villa with Private Pool',
        description: 'Exceptional 5-bedroom villa featuring contemporary design, gourmet kitchen, spa-like bathrooms, home theater, and resort-style backyard with infinity pool and outdoor kitchen. Smart home technology throughout.',
        price: 4200000,
        propertyType: 'villa',
        location: {
          address: '321 Sunset Boulevard',
          city: 'Miami',
          state: 'FL',
          zipCode: '33101',
          country: 'USA'
        },
        googleMapsLink: 'https://maps.google.com/?q=Miami+FL',
        images: [],
        bedrooms: 5,
        bathrooms: 4,
        area: { value: 4500, unit: 'sqft' },
        furnished: 'semi-furnished',
        availability: 'available',
        listingType: 'sale',
        features: ['Private Pool', 'Garden', 'Smart Home', 'Security System', 'Garage'],
        agencyId: agency1._id,
        brokerId: agency1Owner._id,
        contactDetails: {
          name: 'Sarah Johnson',
          phone: '+1234567891',
          email: 'sarah@luxuryhomes.com'
        }
      },
      {
        title: 'Elegant Townhouse in Historic District',
        description: 'Beautifully restored 4-bedroom townhouse blending historic charm with modern amenities. Original hardwood floors, high ceilings, updated kitchen and bathrooms, private patio, and attached garage.',
        price: 1800000,
        propertyType: 'townhouse',
        location: {
          address: '567 Heritage Lane',
          city: 'Boston',
          state: 'MA',
          zipCode: '02101',
          country: 'USA'
        },
        googleMapsLink: 'https://maps.google.com/?q=Boston+MA',
        images: [],
        bedrooms: 4,
        bathrooms: 3,
        area: { value: 3200, unit: 'sqft' },
        furnished: 'unfurnished',
        availability: 'available',
        listingType: 'sale',
        features: ['Historic', 'Hardwood Floors', 'Patio', 'Garage', 'Updated Kitchen'],
        agencyId: agency1._id,
        brokerId: agency1Owner._id,
        contactDetails: {
          name: 'Sarah Johnson',
          phone: '+1234567891',
          email: 'sarah@luxuryhomes.com'
        }
      },

      // Urban Properties
      {
        title: 'Modern Downtown Apartment',
        description: 'Bright 2-bedroom apartment in the heart of downtown. Features open floor plan, stainless steel appliances, in-unit washer/dryer, and building amenities including fitness center and rooftop deck.',
        price: 450000,
        propertyType: 'apartment',
        location: {
          address: '890 Market Street, Unit 12B',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA'
        },
        googleMapsLink: 'https://maps.google.com/?q=Los+Angeles+CA',
        images: [],
        bedrooms: 2,
        bathrooms: 2,
        area: { value: 1200, unit: 'sqft' },
        furnished: 'unfurnished',
        availability: 'available',
        listingType: 'sale',
        features: ['Gym', 'Rooftop Deck', 'In-Unit Laundry', 'Central AC', 'Storage'],
        agencyId: agency2._id,
        brokerId: agency2Owner._id,
        contactDetails: {
          name: 'Mike Rodriguez',
          phone: '+1234567892',
          email: 'mike@urbanproperties.com',
          whatsapp: '+1234567892'
        }
      },
      {
        title: 'Cozy Studio Near University',
        description: 'Perfect studio apartment for students or young professionals. Efficient layout with murphy bed, kitchenette, modern bathroom. Walking distance to university, public transit, and shopping.',
        price: 2200,
        propertyType: 'apartment',
        location: {
          address: '234 College Avenue, #3A',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          country: 'USA'
        },
        googleMapsLink: 'https://maps.google.com/?q=San+Francisco+CA',
        images: [],
        bedrooms: 0,
        bathrooms: 1,
        area: { value: 450, unit: 'sqft' },
        furnished: 'furnished',
        availability: 'available',
        listingType: 'rent',
        features: ['Furnished', 'Near Transit', 'Pet Friendly', 'Utilities Included'],
        agencyId: agency2._id,
        brokerId: agency2Owner._id,
        contactDetails: {
          name: 'Mike Rodriguez',
          phone: '+1234567892',
          email: 'mike@urbanproperties.com'
        }
      },
      {
        title: 'Spacious Family Home with Backyard',
        description: 'Lovely 3-bedroom house perfect for families. Updated kitchen, hardwood floors throughout, large backyard with patio, two-car garage. Great neighborhood with excellent schools.',
        price: 650000,
        propertyType: 'house',
        location: {
          address: '789 Maple Drive',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        },
        googleMapsLink: 'https://maps.google.com/?q=Seattle+WA',
        images: [],
        bedrooms: 3,
        bathrooms: 2,
        area: { value: 1800, unit: 'sqft' },
        furnished: 'unfurnished',
        availability: 'available',
        listingType: 'sale',
        features: ['Backyard', 'Garage', 'Updated Kitchen', 'Near Schools', 'Hardwood Floors'],
        agencyId: agency2._id,
        brokerId: agency2Owner._id,
        contactDetails: {
          name: 'Mike Rodriguez',
          phone: '+1234567892',
          email: 'mike@urbanproperties.com'
        }
      },
      {
        title: 'Luxury Condo with Ocean Views',
        description: 'Breathtaking 2-bedroom condo with panoramic ocean views. High-end finishes, chef\'s kitchen, spa bathroom, private balcony. Resort-style amenities including pool, spa, and concierge.',
        price: 1200000,
        propertyType: 'condo',
        location: {
          address: '456 Beach Road, Unit 2501',
          city: 'San Diego',
          state: 'CA',
          zipCode: '92101',
          country: 'USA'
        },
        googleMapsLink: 'https://maps.google.com/?q=San+Diego+CA',
        images: [],
        bedrooms: 2,
        bathrooms: 2,
        area: { value: 1600, unit: 'sqft' },
        furnished: 'semi-furnished',
        availability: 'available',
        listingType: 'sale',
        features: ['Ocean View', 'Pool', 'Spa', 'Concierge', 'Balcony', 'Parking'],
        agencyId: agency2._id,
        brokerId: agency2Owner._id,
        contactDetails: {
          name: 'Mike Rodriguez',
          phone: '+1234567892',
          email: 'mike@urbanproperties.com'
        }
      },
      {
        title: 'Commercial Office Space Downtown',
        description: 'Prime commercial office space in bustling downtown area. Open floor plan, high ceilings, large windows, modern HVAC system. Perfect for tech startups or creative agencies. Ample parking available.',
        price: 3500,
        propertyType: 'commercial',
        location: {
          address: '123 Business Plaza, Suite 400',
          city: 'Austin',
          state: 'TX',
          zipCode: '78701',
          country: 'USA'
        },
        googleMapsLink: 'https://maps.google.com/?q=Austin+TX',
        images: [],
        bedrooms: 0,
        bathrooms: 2,
        area: { value: 2000, unit: 'sqft' },
        furnished: 'unfurnished',
        availability: 'available',
        listingType: 'rent',
        features: ['Downtown Location', 'Parking', 'High-Speed Internet', 'Conference Room', 'Kitchen'],
        agencyId: agency2._id,
        brokerId: agency2Owner._id,
        contactDetails: {
          name: 'Mike Rodriguez',
          phone: '+1234567892',
          email: 'mike@urbanproperties.com'
        }
      }
    ];

    const createdProperties = await Property.insertMany(properties);

    // Update agencies with property references
    const agency1Properties = createdProperties.filter(p => p.agencyId.equals(agency1._id));
    const agency2Properties = createdProperties.filter(p => p.agencyId.equals(agency2._id));

    agency1.properties = agency1Properties.map(p => p._id);
    agency2.properties = agency2Properties.map(p => p._id);

    await agency1.save();
    await agency2.save();

    console.log('✅ Sample properties created');

    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                  🎉 DATABASE SEEDED SUCCESSFULLY! 🎉          ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  📦 Created:                                                  ║
║     • 3 Subscription Plans (Basic, Pro, Enterprise)          ║
║     • 3 Users (1 public, 2 agency owners)                    ║
║     • 2 Agencies                                              ║
║     • ${createdProperties.length} Properties                                               ║
║                                                               ║
║  🔐 Test Accounts:                                            ║
║                                                               ║
║  Public User:                                                 ║
║     Email: john@example.com                                   ║
║     Password: password123                                     ║
║                                                               ║
║  Agency 1 (Luxury Homes - Pro Plan):                          ║
║     Email: sarah@luxuryhomes.com                              ║
║     Password: password123                                     ║
║                                                               ║
║  Agency 2 (Urban Properties - Basic Plan):                    ║
║     Email: mike@urbanproperties.com                           ║
║     Password: password123                                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
