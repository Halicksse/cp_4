const { z } = require("zod");

const zodUserSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  email: z.string().email({ message: "Invalid email" }).regex(/\./),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/),
  confirmpassword: z
    .string()
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/),
});

const userValidation = (req, res, next) => {
  try {
    zodUserSchema.parse(req.body);
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = userValidation;
