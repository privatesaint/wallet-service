import Joi from "@hapi/joi";

const RegisterRequest = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().trim().required().messages({
      "string.base": "Name must be string",
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().trim().required().messages({
      "string.email": "Not a valid email",
      "string.base": "Not a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be atleast 8 character long",
      "any.required": "Password is required",
    }),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .messages({ "any.only": "Password not Match!" }),
  });
  return userSchema.validateAsync(data);
};

export default RegisterRequest;
