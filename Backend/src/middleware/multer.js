const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Save directly to the root /uploads folder so http://localhost:5000/uploads/<filename> serves correctly
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

  if (
    file.fieldname === "profileImage" ||
    file.fieldname === "image" ||
    file.fieldname === "images" ||
    file.mimetype.startsWith("image/")
  ) {
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
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

// Helper function to process single or multiple uploaded files to WebP
const processUploadedFiles = async (req, res, next) => {
  try {
    if (!req.files && !req.file) return next();

    const targetFolder = req.uploadSubfolder
      ? path.join(uploadPath, req.uploadSubfolder)
      : uploadPath;

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    // Handle single file upload (req.file)
    if (req.file) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 999999)}`;

      if (req.file.mimetype.startsWith("image/")) {
        const fileBaseName = `${uniqueSuffix}.webp`;
        const filePath = path.join(targetFolder, fileBaseName);

        await sharp(req.file.buffer).webp({ quality: 80 }).toFile(filePath);

        req.file.filename = req.uploadSubfolder
          ? `${req.uploadSubfolder}/${fileBaseName}`
          : fileBaseName;
        req.file.path = filePath;
        req.file.mimetype = "image/webp";
      } else {
        const ext = path.extname(req.file.originalname);
        const fileBaseName = `${uniqueSuffix}${ext}`;
        const filePath = path.join(targetFolder, fileBaseName);

        await fs.promises.writeFile(filePath, req.file.buffer);

        req.file.filename = req.uploadSubfolder
          ? `${req.uploadSubfolder}/${fileBaseName}`
          : fileBaseName;
        req.file.path = filePath;
      }
    }

    // Handle multiple file upload (req.files)
    if (req.files) {
      const filesArray = Array.isArray(req.files)
        ? req.files
        : Object.values(req.files).flat();

      for (const file of filesArray) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 999999)}`;

        if (file.mimetype.startsWith("image/")) {
          const fileBaseName = `${uniqueSuffix}.webp`;
          const filePath = path.join(targetFolder, fileBaseName);

          await sharp(file.buffer).webp({ quality: 80 }).toFile(filePath);

          file.filename = req.uploadSubfolder
            ? `${req.uploadSubfolder}/${fileBaseName}`
            : fileBaseName;
          file.path = filePath;
          file.mimetype = "image/webp";
        } else {
          const ext = path.extname(file.originalname);
          const fileBaseName = `${uniqueSuffix}${ext}`;
          const filePath = path.join(targetFolder, fileBaseName);

          await fs.promises.writeFile(filePath, file.buffer);

          file.filename = req.uploadSubfolder
            ? `${req.uploadSubfolder}/${fileBaseName}`
            : fileBaseName;
          file.path = filePath;
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

// Middleware wrapper for single image uploads
const handleSingleImageUpload = (fieldName, subfolder = "") => {
  return (req, res, next) => {
    req.uploadSubfolder = subfolder;
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      processUploadedFiles(req, res, next);
    });
  };
};

// Middleware wrapper for multiple image uploads (e.g. Shop product images)
const handleMultipleImagesUpload = (fieldName = "images", maxCount = 10, subfolder = "") => {
  return (req, res, next) => {
    req.uploadSubfolder = subfolder;
    upload.array(fieldName, maxCount)(req, res, (err) => {
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
  handleMultipleImagesUpload,
};