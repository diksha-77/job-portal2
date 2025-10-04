import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered successfully", user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials", success: false });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true }).json({
      message: "Login successful",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successful", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging out", success: false });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate("profile.company");
    res.json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", success: false });
  }
};
