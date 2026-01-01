const Property = require('../models/Property');
const Agency = require('../models/Agency');
const fs = require('fs').promises;
const path = require('path');

// Get all properties with filters
exports.getAllProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      propertyType,
      minPrice,
      maxPrice,
      city,
      bedrooms,
      furnished,
      availability,
      listingType,
      agencyId,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (bedrooms) {
      query.bedrooms = Number(bedrooms);
    }

    if (furnished) {
      query.furnished = furnished;
    }

    if (availability) {
      query.availability = availability;
    }

    if (listingType) {
      query.listingType = listingType;
    }

    if (agencyId) {
      query.agencyId = agencyId;
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (Number(page) - 1) * Number(limit);
    const properties = await Property.find(query)
      .populate('agencyId', 'agencyName logo email phone')
      .populate('brokerId', 'name email phone')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Property.countDocuments(query);

    res.json({
      properties,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Server error while fetching properties' });
  }
};

// Get single property
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('agencyId', 'agencyName logo email phone website socialLinks')
      .populate('brokerId', 'name email phone');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.json({ property });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Server error while fetching property' });
  }
};

// Create new property
exports.createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      propertyType,
      location,
      googleMapsLink,
      bedrooms,
      bathrooms,
      area,
      furnished,
      availability,
      listingType,
      features,
      contactDetails,
      socialLinks
    } = req.body;

    // Get user's agency
    const agency = await Agency.findOne({ owner: req.userId });
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found. Please register as an agency first.' });
    }

    // Check subscription validity
    if (!agency.isSubscriptionValid()) {
      return res.status(403).json({ message: 'Subscription expired. Please renew to add properties.' });
    }

    // Check listing limit
    if (!agency.canAddListing()) {
      return res.status(403).json({ 
        message: `Listing limit reached. Your plan allows ${agency.subscription.listingLimit} properties. Please upgrade.` 
      });
    }

    // Process uploaded images
    const images = [];
    let totalImageSize = 0;

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const stat = await fs.stat(file.path);
        totalImageSize += stat.size;
        
        images.push({
          url: `/uploads/${file.filename}`,
          size: stat.size,
          publicId: file.filename
        });
      }

      // Check storage limit
      if (!agency.hasStorageAvailable(totalImageSize)) {
        // Delete uploaded files
        for (const file of req.files) {
          await fs.unlink(file.path).catch(console.error);
        }
        
        return res.status(403).json({ 
          message: 'Storage limit exceeded. Please upgrade your plan or delete some properties.' 
        });
      }
    }

    // Create property
    const property = new Property({
      title,
      description,
      price,
      propertyType,
      location: typeof location === 'string' ? JSON.parse(location) : location,
      googleMapsLink,
      images,
      bedrooms,
      bathrooms,
      area: typeof area === 'string' ? JSON.parse(area) : area,
      furnished,
      availability,
      listingType,
      features: typeof features === 'string' ? JSON.parse(features) : features,
      agencyId: agency._id,
      brokerId: req.userId,
      contactDetails: typeof contactDetails === 'string' ? JSON.parse(contactDetails) : contactDetails,
      socialLinks: typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks
    });

    await property.save();

    // Update agency
    agency.properties.push(property._id);
    agency.storageUsed += totalImageSize;
    await agency.save();

    res.status(201).json({
      message: 'Property created successfully',
      property
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error while creating property' });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check ownership
    const agency = await Agency.findOne({ owner: req.userId });
    if (!property.agencyId.equals(agency._id)) {
      return res.status(403).json({ message: 'You can only update your own properties' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && key !== 'images') {
        if (typeof req.body[key] === 'string' && (key === 'location' || key === 'area' || key === 'features' || key === 'contactDetails' || key === 'socialLinks')) {
          property[key] = JSON.parse(req.body[key]);
        } else {
          property[key] = req.body[key];
        }
      }
    });

    // Handle new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImages = [];
      let totalNewImageSize = 0;

      for (const file of req.files) {
        const stat = await fs.stat(file.path);
        totalNewImageSize += stat.size;
        
        newImages.push({
          url: `/uploads/${file.filename}`,
          size: stat.size,
          publicId: file.filename
        });
      }

      // Check storage limit
      if (!agency.hasStorageAvailable(totalNewImageSize)) {
        for (const file of req.files) {
          await fs.unlink(file.path).catch(console.error);
        }
        
        return res.status(403).json({ 
          message: 'Storage limit exceeded. Please upgrade your plan or delete some images.' 
        });
      }

      property.images = [...property.images, ...newImages];
      agency.storageUsed += totalNewImageSize;
      await agency.save();
    }

    await property.save();

    res.json({
      message: 'Property updated successfully',
      property
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Server error while updating property' });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check ownership
    const agency = await Agency.findOne({ owner: req.userId });
    if (!property.agencyId.equals(agency._id)) {
      return res.status(403).json({ message: 'You can only delete your own properties' });
    }

    // Calculate total image size
    const totalImageSize = property.images.reduce((sum, img) => sum + (img.size || 0), 0);

    // Delete image files
    for (const image of property.images) {
      const imagePath = path.join(__dirname, '..', '..', 'public', image.url);
      await fs.unlink(imagePath).catch(console.error);
    }

    // Delete property
    await Property.findByIdAndDelete(req.params.id);

    // Update agency
    agency.properties = agency.properties.filter(id => !id.equals(property._id));
    agency.storageUsed = Math.max(0, agency.storageUsed - totalImageSize);
    await agency.save();

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Server error while deleting property' });
  }
};

// Get properties by agency
exports.getAgencyProperties = async (req, res) => {
  try {
    const agency = await Agency.findOne({ owner: req.userId });
    
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    const properties = await Property.find({ agencyId: agency._id })
      .sort({ createdAt: -1 });

    res.json({
      properties,
      agency: {
        id: agency._id,
        name: agency.agencyName,
        storageUsed: agency.storageUsed,
        storageLimit: agency.subscription.storageLimit,
        listingCount: properties.length,
        listingLimit: agency.subscription.listingLimit
      }
    });
  } catch (error) {
    console.error('Get agency properties error:', error);
    res.status(500).json({ message: 'Server error while fetching agency properties' });
  }
};

module.exports = exports;
