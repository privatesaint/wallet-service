import axios from "axios";

export class Paystack {
  /**
   * @description Initialize transactions
   * @param {string} postData
   */
  static async initPayment(postData) {
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
      },
    };

    const {
      data: { data },
    } = await axios.post(
      `${process.env.PAYSTACK_HOSTNAME}/transaction/initialize`,
      postData,
      header
    );

    return data;
  }
}
