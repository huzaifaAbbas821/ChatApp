import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Sign Up User
export const signUpUser = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword } = req.body;

    // Validate input fields
    if (!fullname || !username || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      fullname,
      username,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ userID: newUser._id }, "huzaifa4325ikjl45678", {
      expiresIn: "1d",
    });

    // Respond with user details and token
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      token,
    });

  } catch (error) {
    console.error("Error during sign up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userID: user._id }, "huzaifa4325ikjl45678", {
      expiresIn: "1d",
    });

    // Respond with user info and token
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      fullname: user.fullname, // Include fullname in the response
      message: "User logged in successfully",
      token,
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error. Issue with login" });
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    // Clear the JWT cookie (optional, use only if token is stored in cookies)
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error. Issue with logout" });
  }
};
