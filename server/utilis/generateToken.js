import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = async (userId, res) => {
  // Generate JWT token
  const token =  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

  // Set cookie with JWT (without additional options)
  await res.cookie("jwt", token);
};

export default generateTokenAndSetCookies;
