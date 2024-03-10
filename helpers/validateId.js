import HttpError from "./HttpError.js";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, _, next) => {
  const id = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};
