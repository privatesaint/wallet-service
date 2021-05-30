import { Card } from "../models";

export class CardService {
  /**
   * @description Get one card
   * @param {object} data
   */
  static async findCard(signature, email) {
    return await Card.findOne({ signature, email });
  }

  /**
   * @description Create card
   * @param {string} data
   */
  static async create(data) {
    const card = await this.findCard(data.signature, data.email);

    if (!card) {
      return await Card.create({
        user: data.userId,
        email: data.email,
        authorizationCode: data.authorization_code,
        cardType: data.card_type,
        last4: data.last4,
        expMonth: data.exp_month,
        expYear: data.exp_year,
        bin: data.bin,
        bank: data.bank,
        channel: data.channel,
        reusable: data.reusable,
        signature: data.signature,
        brand: data.brand,
        countryCode: data.country_code,
      });
    }
    return card;
  }
}
