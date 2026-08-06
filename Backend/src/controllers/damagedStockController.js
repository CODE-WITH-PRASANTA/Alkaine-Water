const DamagedStock = require("../models/DamagedStock");

// =========================================
// CREATE DAMAGED STOCK
// =========================================
exports.createDamagedStock = async (req, res) => {
  try {
    console.log("========== DAMAGE REQUEST ==========");
    console.log(req.body);
    console.log("====================================");

    const { product, category, broken, leakage, lost, customerDamage } = req.body;

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const damagedStock = await DamagedStock.create({
      product,
      category,
      broken: Number(broken) || 0,
      leakage: Number(leakage) || 0,
      lost: Number(lost) || 0,
      customerDamage: Number(customerDamage) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Damaged stock saved successfully",
      data: damagedStock,
    });
  } catch (error) {
    console.error("Create Damage Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// GET DAMAGE LIST + SUMMARY
// =========================================
exports.getDamagedStockSummary = async (req, res) => {
  try {
    const { product } = req.query;

    const filter = {};
    if (product) filter.product = product;

    // Each entry = one row, newest first
    const records = await DamagedStock.find(filter).sort({ createdAt: -1 });

    const tableData = records.map((item) => {
      const broken = item.broken || 0;
      const leakage = item.leakage || 0;
      const lost = item.lost || 0;
      const customerDamage = item.customerDamage || 0;

      return {
        _id: item._id,
        product: item.product,
        category: item.category,
        broken,
        leakage,
        lost,
        customerDamage,
        total: broken + leakage + lost + customerDamage,
        createdAt: item.createdAt,
      };
    });

    // Totals across all rows, for the summary cards
    const totals = tableData.reduce(
      (acc, row) => {
        acc.broken += row.broken;
        acc.leakage += row.leakage;
        acc.lost += row.lost;
        acc.customerDamage += row.customerDamage;
        acc.totalDamaged += row.total;
        return acc;
      },
      { broken: 0, leakage: 0, lost: 0, customerDamage: 0, totalDamaged: 0 }
    );

    const summaryCards = [
      { key: "totalDamaged", label: "Total Damaged", value: totals.totalDamaged, isRed: true },
      { key: "Broken", label: "Broken", value: totals.broken },
      { key: "Leakage", label: "Leakage", value: totals.leakage },
      { key: "Lost", label: "Lost", value: totals.lost },
      { key: "Customer Damage", label: "Customer Damage", value: totals.customerDamage },
    ];

    res.status(200).json({
      success: true,
      tableData,
      summaryCards,
    });
  } catch (error) {
    console.error("Summary Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};