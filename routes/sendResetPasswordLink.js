import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";

export const sendResetPasswordLink = async (req, res) => {
  const { id } = req.user;

  const user = await prisma.user.findFirst({ where: { id } });

  try {
    const resetPasswordToken = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetPasswordLink = `${process.env.FRONTEND_URL}/password-reset/${resetPasswordToken}`;

    const gmailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const emailInfo = await gmailTransporter.sendMail({
      from: process.env.GMAIL_ADDRESS,
      to: user.email,
      subject: "Backend authorization API - Password reset",
      html: `<h1>Reset password link</h1> <p>Click this link to change password <a href=${resetPasswordLink}>Change password link</a>`,
    });
    return res.json({ sucess: true, email: emailInfo });
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
};
