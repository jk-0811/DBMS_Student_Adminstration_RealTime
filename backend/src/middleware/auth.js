const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || req.cookies.token;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

function requireRole(role) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const user = await prisma.admin.findUnique({ where: { id: req.user.id } });
    if (role === 'admin' && user) {
      req.user.role = 'admin';
      return next();
    }

    if (req.user.role === role) {
      return next();
    }

    return res.status(403).json({ success: false, error: 'Forbidden' });
  };
}

module.exports = { requireAuth, requireRole };
