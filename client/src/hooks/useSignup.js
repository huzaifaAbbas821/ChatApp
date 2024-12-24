import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const UseSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullname, username, password, confirmPassword }) => {
    // Validate input fields before sending to backend
    const isValid = validateSignup({ fullname, username, password, confirmPassword });
    if (!isValid) {
      toast.error("Error in signup");
      return;
    }
    setLoading(true);
    
    try {
      // Make the POST request to the signup endpoint
      const res = await fetch(`http://localhost:3000/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, password, confirmPassword }),
      });
      
      const data = await res.json(); // Parse the response JSON
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong!");
      }

      // Store user data and token locally
      localStorage.setItem("chat-user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      console.log(data.token);

      setAuthUser(data); // Set the authenticated user in context
      toast.success("Signup successful!");
    } catch (error) {
      // Display error message if request fails
      toast.error(error.message);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return { loading, signup };
};

export default UseSignup;

// Validation function for signup form
function validateSignup({ fullname, username, password, confirmPassword }) {
  if (!fullname || !username || !password || !confirmPassword) {
    toast.error("Please fill in all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
