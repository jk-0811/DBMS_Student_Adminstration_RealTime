const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// Get all scholarships
router.get("/", async (req, res) => {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(scholarships);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Create scholarship
router.post("/", async (req, res) => {
  try {
    const scholarship = await prisma.scholarship.create({
      data: req.body
    });

    res.status(201).json(scholarship);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;