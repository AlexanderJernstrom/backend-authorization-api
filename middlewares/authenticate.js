import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token could not be parsed" });
  }
};
