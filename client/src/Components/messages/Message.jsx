import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../utilis/extractTime';
import img2 from "../../assets/img.png"

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  // Determine if the message is sent by the logged-in user
  const fromMe = message.senderId === authUser._id;

  // Dynamic class names
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-500'; // Added default for received messages
  const shakeClass = message.shouldShake ? 'shake' : '';

  // Format message time
  const time = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName}`}>
      {!fromMe && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={img2}
              alt="User Avatar"
            />
          </div>
        </div>
      )}
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} text-white pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 text-white items-center">
        {time}
      </div>
    </div>
  );
}

export default Message;
