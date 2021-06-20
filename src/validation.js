import Joi from "@hapi/joi";

function signupValidation(data) {
  const signupSchema = Joi.object({
    username: Joi.string().min(4).max(12).required(),
    password: Joi.string().min(8).max(15).required(),
    email: Joi.string().min(6).required().email(),
  });
  return signupSchema.validate(data);
}

function loginValidation(data) {
  const loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).max(15).required(),
  });
  return loginSchema.validate(data);
}

export { loginValidation, signupValidation };
