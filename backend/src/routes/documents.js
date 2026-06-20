const express = require('express');
const multer = require('multer');
const path = require('path');
const { requireAuth, requireRole } = require('../middleware/auth');
const prisma = require('../prismaClient');

const router = express.Router();

/* ---------------- MULTER CONFIG ---------------- */

const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(
null,
process.env.UPLOAD_DIR ||
path.join(__dirname, '../../uploads')
);
},

filename: (req, file, cb) => {
cb(
null,
`${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`
);
}
});

const upload = multer({
storage,

limits: {
fileSize: 8 * 1024 * 1024
},

fileFilter: (req, file, cb) => {
const allowed = [
'image/jpeg',
'image/png',
'application/pdf'
];

cb(null, allowed.includes(file.mimetype));

}
});

/* ---------------- UPLOAD DOCUMENTS ---------------- */

router.post(
'/upload',
requireAuth,
upload.fields([
{ name: 'photograph' },
{ name: 'aadhaar' },
{ name: 'sscMemo' },
{ name: 'intermediateMemo' },
{ name: 'transferCertificate' },
{ name: 'incomeCertificate' },
{ name: 'casteCertificate' },
{ name: 'DOBCertificate' },
{ name: 'rankCard' },
{ name: 'signature' },
{ name: 'sportsCertificate' },
{ name: 'academicCertificate' }
]),
async (req, res, next) => {
try {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      error: 'No files uploaded'
    });
  }

  const uploads = Object.entries(req.files).flatMap(
    ([documentType, items]) =>
      items.map((item) => ({
        documentType,
        fileName: item.filename,
        filePath: `/uploads/${item.filename}`
      }))
  );

  const records = await Promise.all(
    uploads.map((record) =>
      prisma.uploadedDocument.create({
        data: {
          ...record,
          studentId: req.user.id
        }
      })
    )
  );

  await prisma.admissionStatus.upsert({
    where: {
      studentId: req.user.id
    },

    update: {
      documentStatus: 'uploaded'
    },

    create: {
      studentId: req.user.id,
      applicationStatus: 'submitted',
      documentStatus: 'uploaded'
    }
  });

  await prisma.notification.create({
    data: {
      studentId: req.user.id,
      title: 'Document Uploaded',
      message:
        'Your documents were uploaded successfully.'
    }
  });

  await prisma.activityLog.create({
    data: {
      action: 'Document Uploaded',
      performedBy: req.user.id,
      studentId: req.user.id
    }
  });

  res.json({
    success: true,
    documents: records
  });

} catch (error) {
  next(error);
}

}
);

/* ---------------- MY DOCUMENTS ---------------- */

router.get(
'/my-list',
requireAuth,
async (req, res, next) => {
try {
  const documents =
    await prisma.uploadedDocument.findMany({
      where: {
        studentId: req.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

  res.json({
    success: true,
    documents
  });

} catch (error) {
  next(error);
}

}
);

/* ---------------- DOCUMENT DETAILS ---------------- */

router.get(
'/:id',
requireAuth,
async (req, res, next) => {
try {
  const document =
    await prisma.uploadedDocument.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });

  if (!document) {
    return res.status(404).json({
      success: false,
      error: 'Document not found'
    });
  }

  res.json({
    success: true,
    document
  });

} catch (error) {
  next(error);
}


}
);

/* ---------------- VERIFY DOCUMENT ---------------- */

router.post(
'/:id/verify',
requireAuth,
requireRole('admin'),
async (req, res, next) => {
try {
  const { status, notes } = req.body;

  if (
    !['approved', 'rejected', 'pending']
      .includes(status)
  ) {
    return res.status(400).json({
      success: false,
      error: 'Invalid status'
    });
  }

  const document =
    await prisma.uploadedDocument.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        verificationStatus: status,
        verificationNotes: notes || null
      }
    });

  await prisma.notification.create({
    data: {
      studentId: document.studentId,
      title:
        status === 'approved'
          ? 'Document Approved'
          : 'Document Rejected',

      message:
        status === 'approved'
          ? 'Your document has been approved.'
          : 'Your document has been rejected. Please review the remarks.'
    }
  });

  await prisma.activityLog.create({
    data: {
      action: `Document ${status}`,
      performedBy: req.user.id,
      studentId: document.studentId,
      details: notes || null
    }
  });

  res.json({
    success: true,
    document
  });

} catch (error) {
  next(error);
}

}
);


module.exports = router;
