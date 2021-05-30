import { Router } from "express";
import { login, register } from "../controllers/AuthController";
import {
  initiateTopup,
  handlePaystackWebhook,
  wallet,
  withdrawal,
} from "../controllers/WalletController";
import { isAuthenticated } from "../middleware/AuthMiddleware";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/users/initiate-topup", isAuthenticated, initiateTopup);
router.get("/users/wallets", isAuthenticated, wallet);
router.post("/users/withdrawal", isAuthenticated, withdrawal);

// paystack webhook
router.post("/paystack/webhook", handlePaystackWebhook);

export default router;
