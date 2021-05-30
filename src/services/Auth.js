import { User } from "../models";
import { Wallet } from "../models";
import ErrorHandler from "../utils/ErrorHandler";

export class Authentication {
  /**
   * @description Login
   * @param {*} email
   * @param {*} password
   */
  static async login({ email, password }) {
    const dbuser = await User.findOne({ email }).select("+password");

    if (!dbuser) {
      throw new ErrorHandler("Invalid credential", 401);
    }
    // return password;
    const checkedPassword = await dbuser.comparePassword(password);

    if (!checkedPassword) {
      throw new ErrorHandler("Invalid credential", 401);
    }

    const token = dbuser.generateJwtToken();

    return { token: `Bearer ${token}` };
  }

  /**
   * @description Account Registeration
   * @param {*} data
   */
  static async register(data) {
    const { name, email, password } = data;

    const user = await User.create({ name, email, password });

    await Wallet.create({ user: user._id, currency: "NGN" });

    const token = user.generateJwtToken();

    return { token: `Bearer ${token}` };
  }
}
