import bcryptjs from "bcryptjs";
import { prisma } from "../index.js";
const { hashSync } = bcryptjs;

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = hashSync(password, 10);

  const userWithEmailExists = await prisma.user.findFirst({ where: { email } });

  if (userWithEmailExists) {
    return res
      .status(403)
      .json({ error: "User with that email already exists" });
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: encryptedPassword,
    },
  });

  return res.json({ user: newUser });
};
