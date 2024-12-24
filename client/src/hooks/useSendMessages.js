import React, { useState } from "react";
import useConversation from "../zustand/useConversation";

const UseSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Moved inside useEffect

      if (!token) {
        // toast.error("No token found. Please log in.");
        navigate("/login");
        return;
      }
      const res = await fetch(
        `http://localhost:3000/api/message/send-message/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      console.log(data);
      // Use functional form to avoid stale state issues
      setMessages([...messages, data]);
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error(error.message);  // Correct error throwing
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default UseSendMessages;
