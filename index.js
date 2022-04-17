import express from "express";
import dotenv from "dotenv";
import Prisma from "@prisma/client";
const { PrismaClient } = Prisma;
dotenv.config();

import { authenticate } from "./middlewares/authenticate.js";

import { register } from "./routes/register.js";
import { login } from "./routes/login.js";
import { me } from "./routes/me.js";
import { deleteAccount } from "./routes/deleteAccount.js";
import { userSearch } from "./routes/search.js";
import { sendResetPasswordLink } from "./routes/sendResetPasswordLink.js";
import { updatePassword } from "./routes/updatePassword.js";

export const prisma = new PrismaClient();

const init = async () => {
  const app = express();

  app.use(express.json());

  app.post("/api/register", register);
  app.post("/api/login", login);
  app.get("/api/account", authenticate, me);
  app.post(
    "/api/account/sendResetPasswordLink",
    authenticate,
    sendResetPasswordLink
  );
  app.patch("/api/account/updatePassword", updatePassword);
  app.delete("/api/account/delete", authenticate, deleteAccount);
  app.get("/api/users/search", authenticate, userSearch);

  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started on port: ${process.env.PORT || 5000}`)
  );
};

init();
