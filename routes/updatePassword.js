import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";

export const updatePassword = async (req, res) => {
  const { updatedPassword, resetPasswordToken } = req.body;

  try {
    const { id } = jwt.verify(resetPasswordToken, process.env.JWT_SECRET);

    const updatedPasswordHashed = await hash(updatedPassword, 10);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: updatedPasswordHashed,
      },
    });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
