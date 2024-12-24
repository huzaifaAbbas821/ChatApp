import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function UseLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return; // Early return to prevent making the request
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      setAuthUser(data);
      toast.success("Login successful!"); // Success feedback
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default UseLogin;
