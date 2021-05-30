import Joi from "@hapi/joi";

const LoginRequest = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().email().trim().required().messages({
      "string.email": "Not a valid email",
      "string.base": "Not a valid email",
      "string.empty": "Email field is required",
      "any.required": "Email field is required",
    }),

    password: Joi.string().required().messages({
      "string.empty": "Password field is required",
      "string.min": "Password must be atleast 8 character long",
      "any.required": "First name field is required",
    }),
  });
  return userSchema.validateAsync(data);
};

export default LoginRequest;
