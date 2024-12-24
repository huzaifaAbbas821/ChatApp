import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    
    // Ensure the authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract token from the Authorization header
    const token = authHeader.split("Bearer ")[1]; // Splitting 'Bearer' from the token
  
    // Verify the token using JWT_SECRET
    const verified = jwt.verify(token, "huzaifa4325ikjl45678");
  

    // Check if verification is successful and contains userID
    if (!verified || !verified.userID) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Find the user by ID from the token's userId
    const user = await User.findById(verified.userID).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Attach the user to the request object for future middleware or routes
    req.user = user;
    next(); // Proceed to the next middleware or route handler

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Malformed token" });
    }
    console.error("Error in protectedRoute middleware:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
