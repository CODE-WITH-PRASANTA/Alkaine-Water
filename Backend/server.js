const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const connectDB = require("./src/config/db");

// Routes Imports
const teamRoutes = require("./src/routes/teamRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");
const testimonialRoutes = require("./src/routes/testimonialRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const manageRoutes = require("./src/routes/manageRoutes");
const vehicleRoutes = require("./src/routes/vehicleRoutes");

const deliveryRoutes = require("./src/routes/deliveryRoutes");
const boysassigneRoutes = require("./src/routes/boyassigneRoutes");
const routeRoutes = require("./src/routes/routeRoutes");
const damagedStockRoutes = require("./src/routes/damagedStockRoutes");
const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");

// Connect Database
connectDB();

const app = express();

// ================= Middleware =================
app.use(cors());

// FIX: raised limit from default 100kb -> 15mb so base64 images in
// JSON bodies (e.g. Route Assignment "image" field) don't get rejected
// by body-parser before they even reach your controllers.
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// ================= Static Folder =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= API Routes =================
app.use("/api/team", teamRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/manage", manageRoutes);

app.use("/api/delivery", deliveryRoutes);
app.use("/api/boysassigne", boysassigneRoutes);
app.use("/api/routeRoutes", routeRoutes);
app.use("/api/damage", damagedStockRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ================= Home Route =================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Association Backend Running Successfully",
  });
});

// ================= 404 Route Handler =================
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ================= Global Error-Handling Middleware =================
app.use((err, req, res, next) => {
  console.error("GLOBAL SERVER ERROR:", err);

  // If Multer error occurs (e.g. invalid file, file limit exceeded)
  if (err instanceof require("multer").MulterError) {
    return res.status(400).json({
      success: false,
      message: `File Upload Error: ${err.message}`,
    });
  }

  // If we passed an error inside multer filter validation manually
  if (err.message && err.message.includes("Only JPG, JPEG, PNG")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // FIX: body-parser throws this when express.json() body exceeds
  // its size limit — was previously falling through to the generic
  // 500 fallback below with no useful message.
  if (err.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message: "Uploaded data is too large. Please use an image under 15MB.",
    });
  }

  // FIX: malformed JSON body (e.g. broken base64 string) also needs
  // its own case instead of falling into the generic 500.
  if (err.type === "entity.parse.failed" || err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in request body.",
    });
  }

  // Fallback for any other unexpected system crashes
  res.status(500).json({
    success: false,
    message: err.message || "An unexpected system error occurred",
  });
});

// ================= Start Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});