import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account deactivated" });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied — requires role: ${roles.join(", ")}`,
      });
    }

    next();
  };
};

const checkSubscription = (req, res, next) => {
  try {
    if (["user", "admin"].includes(req.user.role)) {
      return next();
    }

    if (!req.user.isSubscriptionValid()) {
      return res.status(402).json({
        message: "Subscription expired — please renew",
      });
    }

    next();
  } catch (err) {
    console.error("Subscription check error:", err.message);
    return res.status(500).json({ message: "Subscription check failed" });
  }
};

export { auth, authorize, checkSubscription };
