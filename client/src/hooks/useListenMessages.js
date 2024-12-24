import { useSocketContext } from "../../../client/src/context/SocketContext";
import useConversation from "../../../client/src/zustand/useConversation";
import { useEffect } from "react";
import notification from "../../../client/src/assets/sound/notification.mp3";

function UseListenMessages() {
  const { socket } = useSocketContext(); // Correct function call
  const { messages,setMessages } = useConversation();

  useEffect(() => {
    console.log("Listening for new messages...");

    if (!socket) return;
    // Attach the listener
    socket.on("newMessage",  (newMessage) => {
      newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
      const sound = new Audio(notification);
      sound.play();
      console.log("New message received:", newMessage);
    });

    // Cleanup the listener
    return () => {
      console.log("Cleaning up socket listener...");
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]); // Dependencies: `socket` and `setMessages`

  return null; // Hook doesn't render anything
}

export default UseListenMessages;
