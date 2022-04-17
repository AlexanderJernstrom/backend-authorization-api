import { prisma } from "../index.js";

export const me = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      return res.status(500).json({ error: "Could not find user" });
    }

    return res.json({ me: user });
  } catch (error) {
    return res.status(500).json({ error: "Could not find user" });
  }
};
