import catchAsyncError from "../middleware/catchAsyncError";
import { Authentication } from "../services";
import RegisterRequest from "../validation/RegisterRequest";
import LoginRequest from "../validation/LoginRequest";

/**
 * @route   POST api/v1/login
 * @desc    Account Authentication
 * @access  Public
 */
export const login = catchAsyncError(async (req, res, next) => {
  const validateData = await LoginRequest(req.body);

  const response = await Authentication.login(validateData);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: response,
  });
});

/**
 * @route   POST api/v1/register
 * @desc    Account Creation
 * @access  Public
 */
export const register = catchAsyncError(async (req, res, next) => {
  const validateData = await RegisterRequest(req.body);

  const newUser = await Authentication.register(validateData);

  return res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: newUser,
  });
});
