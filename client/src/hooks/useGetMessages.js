import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const UseGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token not found");
          return;
        }
        const res = await fetch(
          `http://localhost:3000/api/message/get-message/${selectedConversation._id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        } 
        setMessages(data);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };

    if(selectedConversation?._id) getMessage();

  }, [selectedConversation?._id,setMessages]);
  return {messages , loading};
};

export default UseGetMessages;
