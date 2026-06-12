const jwt = require('jsonwebtoken');

function createToken(payload, secret, expiresIn) {
  return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

function authTokens(user) {
  const accessToken = createToken({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, '2h');
  const refreshToken = createToken({ id: user.id, email: user.email, role: user.role }, process.env.REFRESH_TOKEN_SECRET, '30d');
  return { accessToken, refreshToken };
}

module.exports = { createToken, verifyToken, authTokens };
