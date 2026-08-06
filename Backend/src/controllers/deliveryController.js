const DeliveryPartner = require("../models/delivery");


// GET ALL DELIVERY PARTNERS
exports.getAllDeliveryPartners = async (req, res, next) => {
  try {
    const partners = await DeliveryPartner.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: partners,
    });
  } catch (error) {
    console.error("GET DELIVERY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// CREATE DELIVERY PARTNER
exports.createDeliveryPartner = async (req, res, next) => {
  try {
    const { name, phone, aadharNo, email, address, salary, password } = req.body;

    if (!name || !phone || !aadharNo || !email || !address || !salary || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const existingPartner = await DeliveryPartner.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    let profileImage = null;
    let offerLetter = null;

    if (req.files?.profileImage) {
      profileImage = req.files.profileImage[0].filename;
    }

    if (req.files?.offerLetter) {
      offerLetter = req.files.offerLetter[0].filename;
    }

    if (!profileImage) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    const partner = new DeliveryPartner({
      name,
      phone,
      aadharNo,
      email,
      address,
      salary: Number(salary),
      password,
      profileImage,
      offerLetter,
    });

    await partner.save();

    const response = partner.toObject();
    delete response.password;

    res.status(201).json({
      success: true,
      message: "Delivery Partner Created Successfully",
      data: response,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry already exists (Email or Login ID)",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// LOGIN DELIVERY PARTNER
exports.loginDeliveryPartner = async (req, res, next) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: "Login ID and password required",
      });
    }

    const partner = await DeliveryPartner.findOne({ loginId }).select("+password");

    if (!partner) {
      return res.status(401).json({
        success: false,
        message: "Invalid Login ID",
      });
    }

    const isMatch = await partner.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const response = partner.toObject();
    delete response.password;

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: response,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// UPDATE DELIVERY PARTNER
exports.updateDeliveryPartner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const partner = await DeliveryPartner.findById(id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Delivery Partner not found",
      });
    }

    const { name, phone, aadharNo, email, address, salary, password } = req.body;

    if (name) partner.name = name;
    if (phone) partner.phone = phone;
    if (aadharNo) partner.aadharNo = aadharNo;
    if (email) partner.email = email;
    if (address) partner.address = address;
    if (salary) partner.salary = Number(salary);

    if (password && password.trim() !== "") {
      partner.password = password;
    }

    if (req.files?.profileImage) {
      partner.profileImage = req.files.profileImage[0].filename;
    }

    if (req.files?.offerLetter) {
      partner.offerLetter = req.files.offerLetter[0].filename;
    }

    await partner.save();

    const response = partner.toObject();
    delete response.password;

    res.status(200).json({
      success: true,
      message: "Delivery Partner Updated Successfully",
      data: response,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// DELETE DELIVERY PARTNER
exports.deleteDeliveryPartner = async (req, res, next) => {
  try {
    const partner = await DeliveryPartner.findByIdAndDelete(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Delivery Partner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Delivery Partner Deleted Successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};