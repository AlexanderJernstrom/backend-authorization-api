import { prisma } from "../index.js";

export const userSearch = async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const searchResults = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              search,
            },
          },
          {
            name: {
              search,
            },
          },
        ],
      },
    });
    return res.json({ users: searchResults });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
