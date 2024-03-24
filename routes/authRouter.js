import express from "express";
import validateBody from "../helpers/validateBody.js";
import { userSigninSchema, userSignupSchema } from "../schemas/usersSchemas.js";
import authControllers from "../controllers/authControllers.js";
import { authenticate } from "../helpers/authenticate.js";
import upload from "../helpers/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  authControllers.signUp
);

authRouter.post(
  "/login",
  validateBody(userSigninSchema),
  authControllers.signIn
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

export default authRouter;
