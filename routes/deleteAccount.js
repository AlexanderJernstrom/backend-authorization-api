import { prisma } from "../index.js";

export const deleteAccount = async (req, res) => {
  const { id } = req.user;

  try {
    await prisma.user.delete({ where: { id } });
    return res.json({ message: "Account successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Account could not be deleted" });
  }
};
