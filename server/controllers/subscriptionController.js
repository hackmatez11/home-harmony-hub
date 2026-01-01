const SubscriptionPlan = require('../models/SubscriptionPlan');
const Agency = require('../models/Agency');
const User = require('../models/User');

// Get all subscription plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({ isActive: true }).sort({ priceMonthly: 1 });
    res.json({ plans });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ message: 'Server error while fetching plans' });
  }
};

// Get single plan
exports.getPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findOne({ planName: req.params.planName });
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json({ plan });
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({ message: 'Server error while fetching plan' });
  }
};

// Subscribe to a plan (or upgrade/downgrade)
exports.subscribeToPlan = async (req, res) => {
  try {
    const { planName, billingCycle = 'monthly', paymentMethod } = req.body;

    const plan = await SubscriptionPlan.findOne({ planName, isActive: true });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const agency = await Agency.findOne({ owner: req.userId });
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    // Calculate new dates
    const startDate = new Date();
    const endDate = new Date();
    if (billingCycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Mock payment processing
    const paymentAmount = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
    
    // In a real app, you would integrate with Stripe, PayPal, etc.
    console.log(`Processing payment of $${paymentAmount} via ${paymentMethod}`);

    // Update agency subscription
    agency.subscription.planName = planName;
    agency.subscription.startDate = startDate;
    agency.subscription.endDate = endDate;
    agency.subscription.billingCycle = billingCycle;
    agency.subscription.storageLimit = plan.storageLimit;
    agency.subscription.listingLimit = plan.listingLimit;

    await agency.save();

    // Update user subscription
    const user = await User.findById(req.userId);
    user.subscriptionPlan = planName;
    user.subscriptionStartDate = startDate;
    user.subscriptionEndDate = endDate;
    await user.save();

    res.json({
      message: 'Subscription updated successfully',
      subscription: {
        plan: planName,
        billingCycle,
        startDate,
        endDate,
        amount: paymentAmount
      }
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ message: 'Server error while processing subscription' });
  }
};

// Get current subscription status
exports.getSubscriptionStatus = async (req, res) => {
  try {
    const agency = await Agency.findOne({ owner: req.userId });
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    const plan = await SubscriptionPlan.findOne({ planName: agency.subscription.planName });

    res.json({
      subscription: {
        ...agency.subscription.toObject(),
        isValid: agency.isSubscriptionValid(),
        planDetails: plan,
        storageUsed: agency.storageUsed,
        storageUsedPercent: (agency.storageUsed / agency.subscription.storageLimit) * 100,
        listingCount: agency.properties.length,
        listingUsedPercent: (agency.properties.length / agency.subscription.listingLimit) * 100
      }
    });
  } catch (error) {
    console.error('Get subscription status error:', error);
    res.status(500).json({ message: 'Server error while fetching subscription' });
  }
};

// Cancel subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const agency = await Agency.findOne({ owner: req.userId });
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    // Set end date to now (immediate cancellation)
    // In a real app, you might want to let them use until the period ends
    agency.subscription.endDate = new Date();
    await agency.save();

    const user = await User.findById(req.userId);
    user.subscriptionPlan = 'none';
    user.subscriptionEndDate = new Date();
    await user.save();

    res.json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ message: 'Server error while cancelling subscription' });
  }
};

module.exports = exports;
