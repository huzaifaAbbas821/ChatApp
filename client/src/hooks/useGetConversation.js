import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UseGetConversation() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getConversations = async () => {
      const token = localStorage.getItem("token"); // Moved inside useEffect

      if (!token) {
        // toast.error("No token found. Please log in.");
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          let errorMessage = "Failed to fetch conversations";
          try {
            const errorData = await res.json();
            errorMessage = errorData.message || errorMessage;
          } catch {
            // Keep default error message if response is not JSON (e.g., server 500 error page)
          }
          throw new Error(errorMessage);
        }

        const data = await res.json();
        setConversations(data);
      } catch (error) {
        toast.error(error.message || "Error in fetching conversations");
        if (error.message == "Unauthorized: Token has expired") {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []); // Empty dependency array to run effect only once on mount

  return { loading, conversations };
}

export default UseGetConversation;
