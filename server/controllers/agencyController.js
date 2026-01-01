const Agency = require('../models/Agency');
const User = require('../models/User');

// Get agency details
exports.getAgency = async (req, res) => {
  try {
    const agency = await Agency.findOne({ owner: req.userId })
      .populate('owner', 'name email phone')
      .populate('properties');

    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    res.json({
      agency: {
        ...agency.toObject(),
        subscriptionValid: agency.isSubscriptionValid()
      }
    });
  } catch (error) {
    console.error('Get agency error:', error);
    res.status(500).json({ message: 'Server error while fetching agency' });
  }
};

// Update agency profile
exports.updateAgency = async (req, res) => {
  try {
    const agency = await Agency.findOne({ owner: req.userId });
    
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    const allowedUpdates = [
      'agencyName',
      'description',
      'phone',
      'address',
      'website',
      'socialLinks'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        agency[field] = req.body[field];
      }
    });

    // Handle logo upload
    if (req.file) {
      agency.logo = `/uploads/${req.file.filename}`;
    }

    await agency.save();

    res.json({
      message: 'Agency updated successfully',
      agency
    });
  } catch (error) {
    console.error('Update agency error:', error);
    res.status(500).json({ message: 'Server error while updating agency' });
  }
};

// Get agency by ID (public)
exports.getAgencyById = async (req, res) => {
  try {
    const agency = await Agency.findById(req.params.id)
      .populate('owner', 'name email phone')
      .select('-subscription');

    if (!agency || !agency.isActive) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    res.json({ agency });
  } catch (error) {
    console.error('Get agency by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching agency' });
  }
};

// Get all agencies (public)
exports.getAllAgencies = async (req, res) => {
  try {
    const { page = 1, limit = 12, search } = req.query;

    const query = { isActive: true, isVerified: true };

    if (search) {
      query.$or = [
        { agencyName: new RegExp(search, 'i') },
        { 'address.city': new RegExp(search, 'i') }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const agencies = await Agency.find(query)
      .select('agencyName logo email phone address website socialLinks')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Agency.countDocuments(query);

    res.json({
      agencies,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get all agencies error:', error);
    res.status(500).json({ message: 'Server error while fetching agencies' });
  }
};

// Get agency dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const agency = await Agency.findOne({ owner: req.userId }).populate('properties');
    
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    const Property = require('../models/Property');
    
    const stats = {
      totalProperties: agency.properties.length,
      availableProperties: await Property.countDocuments({ 
        agencyId: agency._id, 
        availability: 'available' 
      }),
      soldProperties: await Property.countDocuments({ 
        agencyId: agency._id, 
        availability: 'sold' 
      }),
      totalViews: agency.properties.reduce((sum, prop) => sum + (prop.views || 0), 0),
      storageUsed: agency.storageUsed,
      storageLimit: agency.subscription.storageLimit,
      storageUsedPercent: (agency.storageUsed / agency.subscription.storageLimit) * 100,
      listingCount: agency.properties.length,
      listingLimit: agency.subscription.listingLimit,
      listingUsedPercent: (agency.properties.length / agency.subscription.listingLimit) * 100,
      subscriptionValid: agency.isSubscriptionValid(),
      subscriptionEndDate: agency.subscription.endDate
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error while fetching stats' });
  }
};

module.exports = exports;
