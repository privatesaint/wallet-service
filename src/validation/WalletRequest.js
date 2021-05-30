import Joi from "@hapi/joi";

// would have included currency to handle multi currency funding
const WalletRequest = (data) => {
  const walletSchema = Joi.object({
    amount: Joi.number().required().messages({
      "number.empty": "Amount is required",
      "any.required": "Amount is required",
    }),
  });
  return walletSchema.validateAsync(data);
};

export default WalletRequest;
