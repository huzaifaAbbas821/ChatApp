import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function UseLogout() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Remove user from localStorage
      localStorage.removeItem("chat-user");
      localStorage.removeItem("token");

      // Reset authenticated user context
      setAuthUser(null);

      // Optional success message
      toast.success("Logged out successfully!");

    } catch (error) {
      toast.error(`Error in logout: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
}

export default UseLogout;
