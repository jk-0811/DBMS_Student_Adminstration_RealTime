const express = require('express');
const { z } = require('zod');
const prisma = require('../prismaClient');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const admissionSchema = z.object({
  course: z.string().min(2),
  branch: z.string().min(2),
  admissionCategory: z.string().min(2),
  hostelRequired: z.boolean(),
  scholarshipRequired: z.boolean(),
  previousInstitution: z.string().optional(),
  declarationAccepted: z.boolean().refine(val => val === true, { message: 'Declaration must be accepted' })
});

const academicSchema = z.object({
  secondarySchool: z.string().optional(),
  secondaryBoard: z.string().optional(),
  secondaryPercentage: z.number().min(0).max(100).optional(),
  secondaryYear: z.number().optional(),
  intermediateCollege: z.string().optional(),
  intermediateBoard: z.string().optional(),
  intermediatePercentage: z.number().min(0).max(100).optional(),
  intermediateYear: z.number().optional(),
  examName: z.string().optional(),
  examRank: z.string().optional(),
  examScore: z.string().optional(),
  examYear: z.number().optional()
});

router.post('/draft', requireAuth, validate(admissionSchema), async (req, res, next) => {
  try {
    const admission = await prisma.admissionForm.upsert({
      where: { studentId: req.user.id },
      update: { ...req.body, draft: true, submittedAt: null },
      create: { ...req.body, draft: true, studentId: req.user.id }
    });
    res.json({ success: true, admission });
  } catch (error) {
    next(error);
  }
});

router.post('/academic', requireAuth, validate(academicSchema), async (req, res, next) => {
  try {
    const academic = await prisma.academicDetail.upsert({
      where: { studentId: req.user.id },
      update: { ...req.body },
      create: { ...req.body, studentId: req.user.id }
    });
    res.json({ success: true, academic });
  } catch (error) {
    next(error);
  }
});

router.post('/submit', requireAuth, async (req, res, next) => {
  try {
    const admission = await prisma.admissionForm.update({
      where: { studentId: req.user.id },
      data: { draft: false, submittedAt: new Date(), status: 'submitted' }
    });
    await prisma.admissionStatus.upsert({
      where: { studentId: req.user.id },
      update: { applicationStatus: 'submitted' },
      create: { studentId: req.user.id, applicationStatus: 'submitted', documentStatus: 'pending' }
    });
    res.json({ success: true, admission });
  } catch (error) {
    next(error);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const admission = await prisma.admissionForm.findUnique({ where: { studentId: req.user.id } });
    res.json({ success: true, admission });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
