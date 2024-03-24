import User from "../models/User.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

export const findUser = (filter) => User.findOne(filter);

export const signup = async (data) => {
  const avatarURL = gravatar.url(data.email);
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashPassword, avatarURL });
};

export const validatePassword = (password, hashPassword) =>
  bcrypt.compare(password, hashPassword);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
