import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).res.json({
      message: "Access denied!",
    });
  try {
    const verified = jwt.verify(token, process.env.AUTH_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
export default auth;
