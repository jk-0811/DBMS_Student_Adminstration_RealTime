const router = require("express").Router();
const prisma = require("../prismaClient");

router.get("/admin", async (req, res) => {
  try {

    const totalStudents = await prisma.student.count();

    const approved = await prisma.admissionStatus.count({
      where: {
        applicationStatus: "approved"
      }
    });

    const pending = await prisma.admissionStatus.count({
      where: {
        applicationStatus: "pending"
      }
    });

    const rejected = await prisma.admissionStatus.count({
      where: {
        applicationStatus: "rejected"
      }
    });

    const branches = await prisma.admissionForm.groupBy({
      by: ["branch"],
      _count: true
    });

    res.json({
      totalStudents,
      approved,
      pending,
      rejected,
      branches
    });

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;