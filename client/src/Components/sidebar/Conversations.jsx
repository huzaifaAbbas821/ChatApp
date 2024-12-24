import React from 'react';
import Conversation from './Conversation';
import UseGetConversation from '../../hooks/useGetConversation.js';
import { getRandomEmoji } from '../utilis/emojis.js';
// import "../../App.css"


function Conversations() {
  const { loading, conversations } = UseGetConversation();

  return (
    <div
      className="py-2 flex flex-col overflow-auto scroll-container"
    >
      {conversations.map((data) => (
        <Conversation key={data._id} conversation={data} emoji={getRandomEmoji()} />
      ))}
      {loading ? <span className="loading-spinner loading text-gray-950 mx-auto"></span> : null}
    </div>
  );
}

export default Conversations;
