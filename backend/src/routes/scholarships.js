const express = require("express");
const router = express.Router();

const prisma = require("../prismaClient");
const { requireAuth, requireRole } = require("../middleware/auth");

/* GET ALL SCHOLARSHIPS*/
router.get("/", async (req, res) => {
try {
const scholarships = await prisma.scholarship.findMany({
orderBy: {
createdAt: "desc"
}
});

res.json({
  success: true,
  scholarships
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message
});
}
});

/* # CREATE SCHOLARSHIP (ADMIN)*/
router.post(
"/",
requireAuth,
requireRole("admin"),
async (req, res) => {
try {
const scholarship = await prisma.activityLog.create({

  data:{
    action:"Scholarship Applied",
    performedBy:req.user.id,
    studentId:req.user.id
  }

});

  res.status(201).json({
    success: true,
    scholarship
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  });
}


}
);

/*# UPDATE SCHOLARSHIP (ADMIN)*/
router.put(
"/:id",
requireAuth,
requireRole("admin"),
async (req, res) => {
try {
const scholarship = await prisma.scholarship.update({
where: {
id: Number(req.params.id)
},
data: req.body
});


  res.json({
    success: true,
    scholarship
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  });
}


}
);

/*# DELETE SCHOLARSHIP (ADMIN)*/
router.delete(
"/:id",
requireAuth,
requireRole("admin"),
async (req, res) => {
try {
await prisma.scholarship.delete({
where: {
id: Number(req.params.id)
}
});

  res.json({
    success: true,
    message: "Scholarship deleted successfully"
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  });
}


}
);

/* APPLY FOR SCHOLARSHIP (STUDENT)*/
router.post("/apply", requireAuth, async (req, res) => {
try {
const { scholarshipId } = req.body;

const existing =
  await prisma.studentScholarship.findFirst({
    where: {
      studentId: req.user.id,
      scholarshipId: Number(scholarshipId)
    }
  });

if (existing) {
  return res.status(400).json({
    success: false,
    message: "Already applied"
  });
}

const application =
  await prisma.studentScholarship.create({
    data: {
      studentId: req.user.id,
      scholarshipId: Number(scholarshipId),
      status: "pending"
    }
  });

res.status(201).json({
  success: true,
  application
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message
});
}
});

/*# MY SCHOLARSHIP APPLICATIONS*/
router.get("/my-applications", requireAuth, async (req, res) => {
try {
const applications =
await prisma.studentScholarship.findMany({
where: {
studentId: req.user.id
},
include: {
scholarship: true
}
});


res.json({
  success: true,
  applications
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message
});
}
});

/*ADMIN - VIEW ALL APPLICATIONS*/
router.get("/applications/all",
requireAuth,
requireRole("admin"),
async (req, res) => {
try {
const applications =
await prisma.studentScholarship.findMany({
include: {
student: true,
scholarship: true
}
});

  res.json({
    success: true,
    applications
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  });
}


}
);

router.put("/application/:id",
requireAuth,
requireRole("admin"),
async (req, res) => {
try {
if(status === "approved"){

  await prisma.notification.create({

    data:{
      studentId: application.studentId,
      title:"Scholarship Approved",
      message:
      "Your scholarship application was approved."
    }

  });
}

  res.json({
    success: true,
    application
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  });
}

}
);

module.exports = router;
