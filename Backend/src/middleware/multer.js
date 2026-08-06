const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Upload folder path
const uploadPath = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Memory Storage so Sharp can convert images before writing to disk
const storage = multer.memoryStorage();

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/bmp",
    "image/tiff",
  ];
  
  const allowedDocTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (file.fieldname === "profileImage" || file.fieldname === "image") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only valid image formats are allowed"), false);
    }
  } else if (file.fieldname === "offerLetter") {
    if (allowedDocTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed"), false);
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Helper function to process single or multiple uploaded files to WebP
const processUploadedFiles = async (req, res, next) => {
  try {
    if (!req.files && !req.file) return next();

    // Handle single file upload (req.file)
    if (req.file) {
      if (req.file.mimetype.startsWith("image/")) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 999999)}`;
        const filename = `${uniqueSuffix}.webp`;
        const filePath = path.join(uploadPath, filename);

        await sharp(req.file.buffer).webp({ quality: 80 }).toFile(filePath);

        req.file.filename = filename;
        req.file.path = filePath;
        req.file.mimetype = "image/webp";
      } else {
        const ext = path.extname(req.file.originalname);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 999999)}`;
        const filename = `${uniqueSuffix}${ext}`;
        const filePath = path.join(uploadPath, filename);

        await fs.promises.writeFile(filePath, req.file.buffer);

        req.file.filename = filename;
        req.file.path = filePath;
      }
    }

    // Handle multiple file upload (req.files)
    if (req.files) {
      const fieldKeys = Array.isArray(req.files) ? [req.files] : Object.keys(req.files);
      
      for (const key of Object.keys(req.files)) {
        const fileList = Array.isArray(req.files[key]) ? req.files[key] : [req.files[key]];
        for (const file of fileList) {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 999999)}`;

          if (file.mimetype.startsWith("image/")) {
            const filename = `${uniqueSuffix}.webp`;
            const filePath = path.join(uploadPath, filename);

            await sharp(file.buffer).webp({ quality: 80 }).toFile(filePath);

            file.filename = filename;
            file.path = filePath;
            file.mimetype = "image/webp";
          } else {
            const ext = path.extname(file.originalname);
            const filename = `${uniqueSuffix}${ext}`;
            const filePath = path.join(uploadPath, filename);

            await fs.promises.writeFile(filePath, file.buffer);

            file.filename = filename;
            file.path = filePath;
          }
        }
      }
    }

    next();
  } catch (error) {
    console.error("Error processing files:", error);
    return res.status(500).json({
      success: false,
      message: `File processing error: ${error.message}`,
    });
  }
};

// Middleware wrapper for delivery partners (multiple fields)
const handleDeliveryUploads = (req, res, next) => {
  const uploadFields = upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "offerLetter", maxCount: 1 },
  ]);

  uploadFields(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    processUploadedFiles(req, res, next);
  });
};

// Middleware wrapper for single image uploads (e.g., team members)
const handleSingleImageUpload = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      processUploadedFiles(req, res, next);
    });
  };
};

module.exports = {
  upload,
  processUploadedFiles,
  handleDeliveryUploads,
  handleSingleImageUpload,
};