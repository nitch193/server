import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginValidation, signupValidation } from "../validation";
const userController = {};

userController.signup = async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).json({ message: error.details });
  db.User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  })
    .then(async (user) => {
      if (user) {
        let errors = {};
        if (user.username === req.body.username)
          errors.username = "This username is taken";
        if (user.email === req.body.email)
          errors.email = "Email already in use";
        return res.status(400).json(errors);
      } else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new db.User({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
        });
        user
          .save()
          .then((newUser) => {
            res.status(200).json({
              success: true,
              data: newUser,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err,
            });
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({ messsage: err });
    });
};

userController.login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details });
  const user = await db.User.findOne({ email: email }).catch((err) => {
    return res.status(500).json({ message: err });
  });
  if (!user)
    return res.status(404).json({
      message: "User not found",
    });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).json({
      message: "Password is incorrect",
    });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token);
  return res.status(200).json({
    success: true,
    accessToken: token,
  });
};

export default userController;
