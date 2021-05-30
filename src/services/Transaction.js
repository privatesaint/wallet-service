import { Transaction } from "../models";

export class TransactionService {
  /**
   * @description Create Transaction
   * @param {string} data
   */
  static async create(data) {
    await Transaction.create({
      user: data.userId,
      card: data.cardId,
      reference: data.reference,
      amount: data.amount,
      paidAt: data.paid_at,
      createdAt: data.created_at,
      channel: data.channel,
      currency: data.currency,
      type: data.type,
      status: data.status,
      fees: data.fees,
    });
  }
}
