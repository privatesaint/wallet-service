import jwt from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError";
import { User } from "../models";
import ErrorHandler from "../utils/ErrorHandler";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler("Access denied :(", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_TOKEN);
  req.user = await User.findById(decoded.id);

  next();
});
