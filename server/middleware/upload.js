const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload folder exists
const uploadPath = path.join(__dirname, "..", "public/uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Allowed image types
const allowedTypes = /jpeg|jpg|png|gif|webp/i;

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `property-${uniqueName}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file format! Only jpeg, jpg, png, gif, webp allowed"),
      false
    );
  }
};

// Multer config
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB/file
    files: 10,
  },
  fileFilter,
});

// Export single/multiple upload helpers
module.exports = {
  uploadSingle: upload.single("image"),
  uploadMultiple: upload.array("images", 10),
};
