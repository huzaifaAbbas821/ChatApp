import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import UseSendMessages from "../../hooks/useSendMessages";

function MessagesInput() {
  const { sendMessage, loading } = UseSendMessages();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;  // Prevent sending empty messages
    await sendMessage(message);
    setMessage("");  // Clear input after sending
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}  // Update state on input change
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-white"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
}

export default MessagesInput;
