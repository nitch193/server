import db from "../models";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"
const userController = {};

userController.signup = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = bcrypt.hash(password, salt);
  const user = new db.User({
    username: username,
    password: hashedPassword,
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

userController.login = async (res, req) => {
  const user = await db.User.findOne({ username: req.body.username });
  if (!user)
    return res.status(404).res.json({
      message: "User not found",
    });

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass)
    return res.status(400).res.json({
      message: "Password is incorrect",
    });

  return res.status(200).json({
    success: true,
    data: user,
  });
};

export default userController;
