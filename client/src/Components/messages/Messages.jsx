import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages"; // Fixed capitalization

// Stack implementation
class Stack {
  constructor() {
    this.stack = [];
  }

  push(item) {
    this.stack.push(item);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.stack.pop();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }

  toArray() {
    return [...this.stack];
  }
}

function Messages() {
  const { loading, messages } = useGetMessages();
  useListenMessages(); // Correctly calling the hook here
  const [stack] = useState(new Stack()); // Initialize stack
  const [stackMessages, setStackMessages] = useState([]); // Local state for stack data
  const lastMessageRef = useRef(); // Reference for scrolling to the last message

  // Update the stack and synchronize with local state
  useEffect(() => {
    if (!loading) {
      stack.stack = []; // Clear the stack
      messages.forEach((message) => stack.push(message));
      setStackMessages(stack.toArray()); // Update local state
    }
  }, [messages, loading, stack]);

  useEffect(() => {
    // Scroll to the last message whenever the stack updates
    if (lastMessageRef.current) {
      setTimeout(() => lastMessageRef.current.scrollIntoView({ behavior: "smooth" }), 10);
    }
  }, [stackMessages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && stackMessages.length > 0 && (
        stackMessages.map((message, index) => (
          <div
            key={message._id}
            ref={index === stackMessages.length - 1 ? lastMessageRef : null} // Add ref to the last message
          >
            <Message message={message} />
          </div>
        ))
      )}
      {!loading && !stackMessages.length && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
}

export default Messages;
