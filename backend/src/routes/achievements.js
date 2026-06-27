const router = require("express").Router();

const prisma = require("../prismaClient");
const { requireAuth, requireRole } = require("../middleware/auth");

/*
--------------------------------------
Student adds achievement
--------------------------------------
*/

router.post(
  "/",
  requireAuth,
  async (req, res, next) => {
    try {

      const achievement =
        await prisma.achievement.create({

          data: {

            studentId: req.user.id,

            type: req.body.type,

            title: req.body.title,

            description: req.body.description,

            level: req.body.level,

            certificate: req.body.certificate

          }

        });

      res.status(201).json({

        success: true,
        achievement

      });

    } catch (error) {

      next(error);

    }
  }
);

/*
--------------------------------------
Admin - View all achievements
--------------------------------------
*/

router.get(
  "/all",
  requireAuth,
  requireRole("admin"),
  async (req, res, next) => {

    try {

      const achievements =
        await prisma.achievement.findMany({

          include: {
            student:{
                select: {
                  fullName: true,
                  email: true,
                  mobile: true,
                  uploadedDocuments: true
                }
            }
          },

          orderBy: {
            createdAt: "desc"
          }

        });

      res.json({

        success: true,
        achievements

      });

    } catch (error) {

      next(error);

    }

  }
);

module.exports = router;