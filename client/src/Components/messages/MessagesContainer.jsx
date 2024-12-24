import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessagesInput from "./MessagesInput";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

function MessagesContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [localStream, setLocalStream] = useState(null);

  const startMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      document.getElementById("localVideo").srcObject = stream;
    } catch (error) {
      console.error("Error starting media:", error);
    }
  };

  const startCall = (conversationId) => {
    console.log("Starting call for conversation:", conversationId);
    // Add your call logic here
  };

  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      setSelectedConversation(null);
    };
  }, [localStream, setSelectedConversation]);

  return (
    <div className="messages-container flex flex-col border border-gray-600">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">

              <span className="label-text font-semibold">To: </span>{" "}
              <span className="text-gray-900 text-2xl font-bold">
                {selectedConversation.username}
              </span>
          </div>
          <Messages />
          <MessagesInput />
        </>
      )}
    </div>
  );
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.username || "Guest"} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessagesContainer;
