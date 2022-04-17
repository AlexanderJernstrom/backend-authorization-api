import bcryptjs from "bcryptjs";
import { prisma } from "../index.js";
const { compareSync } = bcryptjs;
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const loggedInUser = await prisma.user.findFirst({ where: { email } });

  if (!loggedInUser) {
    return res
      .status(404)
      .json({ error: "User with that email does not exist" });
  }

  const passwordVerified = compareSync(password, loggedInUser.password);

  if (!passwordVerified) {
    return res.status(403).json({ error: "Password does not match user" });
  }

  const token = jwt.sign({ id: loggedInUser.id }, process.env.JWT_SECRET);

  return res.send(token);
};
