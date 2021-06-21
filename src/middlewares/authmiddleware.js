import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers["auth-token"];
  const token = authHeader;
  if (!token)
    return res.status(401).json({
      message: "Access denied!",
    });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
export default auth;
