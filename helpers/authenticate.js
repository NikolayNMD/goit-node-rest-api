import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization header not found"));
  }
  const [Bearer, token] = authorization.split(" ");

  if (Bearer !== "Bearer") {
    return next(HttpError(401, "Bearer not found"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUser({ _id: id });
    if (!user) {
      return next(HttpError(401, "User not found"));
    }
    if (!user.token || user.token !== token) {
      return next(HttpError(401, "User already signout"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};
