import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import img from "../../assets/av.jpg"
import img1 from "../../assets/images.png"
import img2 from "../../assets/img.png"

function Conversation({conversation , emoji}) {
  const {selectedConversation,setSelectedConversation} =useConversation()
  const selected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  
  return (
    <div className={`flex items-center rounded p-2 py-1 cursor-pointer border  border-gray-200 
    ${selected ? "bg-zinc-400 text-white" : ""}`} 
    onClick={() => setSelectedConversation(conversation)}>
        
      <div className={`avatar ${isOnline ? "online" : "" }`}>
        <div className="w-12 rounded-full">
          <img
            src={img2}
            className="bg-transparent"
            alt="avatar Image"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 items-center">
        <div className="flex justify-between gap-3 w-full">
          <p className="font-bold  flex flex-start pl-5 w-[70%] text-gray-700">{`${conversation.username}`}</p>
           <span className="text-xl ">{emoji}</span>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
