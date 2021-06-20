import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginValidation, signupValidation } from "../validation";
const userController = {};

userController.signup = async (req, res) => {
  const { username, password, email } = req.body;

  const { error } = signupValidation(req.body);
  if (error) return res.status(400).json({ message: error.details });

  const emailexist = await db.User.findOne({ email: email });
  const usernameExist = await db.User.findOne({ username: username });
  if (emailexist)
    return res.status(400).res.send({ message: "Email alreasy exists" });
  if (usernameExist)
    return res
      .status(400)
      .res.json({ message: " This Username alreasy exists" });

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new db.User({
    username: username,
    password: hashedPassword,
    email: email,
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
};

userController.login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details });
  const user = await db.User.findOne({ email: email });
  if (!user)
    return res.status(404).res.json({
      message: "User not found",
    });

  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass)
    return res.status(400).res.json({
      message: "Password is incorrect",
    });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return res.status(200).json({
    success: true,
    accessToken: token,
  });
};

export default userController;
