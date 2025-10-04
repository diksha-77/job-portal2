import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Not authenticated", success: false });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;

    const user = await User.findById(req.id);
    if (!user)
      return res.status(401).json({ message: "User not found", success: false });

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed", success: false });
  }
};

export default isAuthenticated;
