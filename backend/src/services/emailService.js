const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail({ to, subject, html, text }) {
  const mail = {
    from: `SAMS Admissions <no-reply@university.example.com>`,
    to,
    subject,
    html,
    text
  };

  return transporter.sendMail(mail);
}

function buildVerificationEmail(name, token) {
  const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  return {
    subject: 'Confirm your SAMS account',
    html: `<p>Hi ${name},</p><p>Please verify your email address by clicking the button below:</p><p><a href="${url}" style="display:inline-block;padding:12px 20px;background:#2563EB;color:#fff;border-radius:8px;text-decoration:none;">Verify Email</a></p><p>If you did not register, ignore this email.</p>`,
    text: `Hi ${name},\nPlease verify your email by visiting: ${url}`
  };
}

function buildPasswordResetEmail(name, token) {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  return {
    subject: 'Reset your SAMS password',
    html: `<p>Hi ${name},</p><p>Reset your password by clicking below:</p><p><a href="${url}" style="display:inline-block;padding:12px 20px;background:#2563EB;color:#fff;border-radius:8px;text-decoration:none;">Reset Password</a></p>`,
    text: `Hi ${name},\nReset your password: ${url}`
  };
}

module.exports = { sendEmail, buildVerificationEmail, buildPasswordResetEmail };
