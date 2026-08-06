const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const deliveryPartnerSchema = new mongoose.Schema(
  {
    loginId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    aadharNo: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profileImage: {
      type: String,
      required: true,
    },
    offerLetter: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Note: No 'next' parameter in async Mongoose hooks
deliveryPartnerSchema.pre("validate", async function () {
  if (this.isNew && !this.loginId) {
    const lastPartner = await this.constructor
      .findOne()
      .sort({ createdAt: -1 });

    let nextId = 1001;

    if (lastPartner && lastPartner.loginId) {
      const number = parseInt(lastPartner.loginId.replace("DB", ""), 10);
      if (!isNaN(number)) {
        nextId = number + 1;
      }
    }

    this.loginId = `DB${nextId}`;
  }
});

deliveryPartnerSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

deliveryPartnerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("DeliveryPartner", deliveryPartnerSchema);