import { Wallet } from "../models";
import { Paystack } from "./Paystack";
import { CardService } from "./Card";
import { TransactionService } from "./Transaction";
import ErrorHandler from "../utils/ErrorHandler";

export class WalletService {
  /**
   * @description Find single wallet
   * @param {string} userId
   */
  static async findOne(user) {
    return await Wallet.findOne({ user });
  }

  /**
   * @description Initialize transactions
   * @param {string} data
   */
  static async initiateFunding(data) {
    data.channels = ["card"];
    data.callback_url = process.env.PAYSTACK_CALLBACK_URL;
    data.metadata = JSON.stringify({ userId: data.userId });
    data.amount = data.amount * 100; // convert from naira to kobo(using NGN as my default in this instance)

    // this can be handled from the form request for dynamic currencies
    data.currency = "NGN";

    return await Paystack.initPayment(data);
  }

  /**
   * @description handle paystack webhooks
   * @param {string} paystackData
   */
  static async paymentWebhook(paystackData) {
    paystackData.data.amount = paystackData.data.amount / 100; // convert amount from kobo to naira(here am using NGN as default)

    let card;
    // store card info for reccurring transaction
    if (paystackData.data.authorization.channel === "card") {
      const cardData = {
        ...paystackData.data.authorization,
        userId: paystackData.data.metadata.userId,
        email: paystackData.data.customer.email,
      };
      card = await CardService.create(cardData);
    }

    const transactionData = {
      userId: paystackData.data.metadata.userId,
      cardId: card ? card.id : null,
      ...paystackData.data,
    };

    // handle paystack charge.success event
    if (paystackData.event === "charge.success") {
      transactionData.type = "credit";

      await TransactionService.create(transactionData);
      // credit wallet
      await Wallet.updateOne(
        { user: transactionData.userId },
        {
          $inc: {
            balance: transactionData.amount,
          },
        }
      );
    }
  }

  /**
   * @description Get user wallet
   * @param {string} user
   */
  static async getUserWallet(user) {
    return await this.findOne(user);
  }

  /**
   * @description charge a wallet
   * @param {string} data
   */
  static async chargeWalllet(data) {
    const wallet = await this.findOne(data.userId);
    if (!wallet || wallet.balance < Number(data.amount)) {
      throw new ErrorHandler("Insufficient Fund", 400);
    }

    // might wanna include transaction pin to approve charge
    wallet.balance -= data.amount;
    await wallet.save();

    return wallet;
  }
}
