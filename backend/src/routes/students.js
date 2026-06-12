const express = require('express');
const { z } = require('zod');
const { requireAuth } = require('../middleware/auth');
const prisma = require('../prismaClient');
const validate = require('../middleware/validate');

const router = express.Router();

const profileSchema = z.object({
  fullName: z.string().min(3).optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),
  bloodGroup: z.string().optional(),
  nationality: z.string().optional(),
  religion: z.string().optional(),
  category: z.string().optional(),
  mobile: z.string().min(10).max(16).optional(),
  address: z.string().optional(),
  guardianName: z.string().optional(),
  guardianOccupation: z.string().optional(),
  guardianIncome: z.string().optional(),
  emergencyContact: z.string().optional()
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.user.id },
      include: {
        academicDetails: true,
        admissionForm: true,
        uploadedDocuments: true,
        notifications: true,
        admissionStatus: true
      }
    });
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, student });
  } catch (error) {
    next(error);
  }
});

router.put('/me', requireAuth, validate(profileSchema), async (req, res, next) => {
  try {
    const { id } = req.user;
    const student = await prisma.student.update({ where: { id }, data: { ...req.body, profileCompleted: true } });
    res.json({ success: true, student });
  } catch (error) {
    next(error);
  }
});

router.get('/dashboard', requireAuth, async (req, res, next) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.user.id },
      include: { admissionForm: true, uploadedDocuments: true, notifications: true, admissionStatus: true }
    });
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });

    const completion = Math.min(100, Math.round((['fullName','emailVerified','dob','gender','mobile','address'].filter(key => student[key]).length / 6) * 100));
    res.json({
      success: true,
      data: {
        applicationStatus: student.admissionStatus?.applicationStatus || 'draft',
        documentsUploaded: student.uploadedDocuments.length,
        verificationProgress: student.admissionStatus?.documentStatus || 'pending',
        notifications: (student.notifications || []).slice(0, 5),
        profileCompletion: completion
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
