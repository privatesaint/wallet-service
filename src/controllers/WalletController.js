import crypto from "crypto";
import catchAsyncError from "../middleware/catchAsyncError";
import { WalletService } from "../services";
import WalletRequest from "../validation/WalletRequest";

/**
 * @route   GET api/users/wallets
 * @desc    Get User wallet
 * @access  Private
 */
export const wallet = catchAsyncError(async (req, res, next) => {
  const wallet = await WalletService.getUserWallet(req.user._id);

  return res.status(200).json({
    success: true,
    message: "",
    data: wallet,
  });
});

/**
 * @route   POST api/users/initiate-topup
 * @desc    Initiate Wallet funding
 * @access  Private
 */
export const initiateTopup = catchAsyncError(async (req, res, next) => {
  const validateData = await WalletRequest(req.body);

  const data = { ...validateData, email: req.user.email, userId: req.user.id };

  const response = await WalletService.initiateFunding(data);

  res.status(200).json({
    success: true,
    message: "",
    data: response,
  });
});

/**
 * @route   POST api/paystack/webhook
 * @desc    Process paystack webhook
 * @access  Public
 */
export const handlePaystackWebhook = catchAsyncError(async (req, res, next) => {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash == req.headers["x-paystack-signature"]) {
    const event = req.body;

    await WalletService.paymentWebhook(event);
  }

  return res.status(200);
});

/**
 * @route   POST api/users/withdrawal
 * @desc    Charge user wallet
 * @access  Private
 */
export const withdrawal = catchAsyncError(async (req, res, next) => {
  const validateData = await WalletRequest(req.body);
  validateData.userId = req.user.id;

  const wallet = await WalletService.chargeWalllet(validateData);

  return res.status(200).json({
    success: true,
    message: "",
    data: wallet,
  });
});
