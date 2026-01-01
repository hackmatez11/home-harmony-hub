import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
      unique: true,
      enum: ["basic", "pro", "enterprise"],
    },
    displayName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priceMonthly: {
      type: Number,
      required: true,
    },
    priceYearly: {
      type: Number,
      required: true,
    },
    storageLimit: {
      type: Number,
      required: true, // in bytes
    },
    listingLimit: {
      type: Number,
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubscriptionPlan = mongoose.model(
  "SubscriptionPlan",
  subscriptionPlanSchema
);

export default SubscriptionPlan;
