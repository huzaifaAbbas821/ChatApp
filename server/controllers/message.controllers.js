import { Conversation } from "../models/converstion.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { getRecieverSocketId, io } from "../socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverID } = req.params;
    const senderID = req.user._id; // senderID

    // Find the conversation where both participants are present
    let conversation = await Conversation.findOne({
      participants: { $all: [ senderID ,recieverID] }
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderID ,recieverID ]
      });
    }

    // Create the new message
    const newMessage = await Message.create({
      senderId: senderID,
      recieverId: recieverID,
      message
    });



    // Push the new message ID into the conversation's messages array
    conversation.messages.push(newMessage._id);

    // Save both the conversation and the new message
    await Promise.all([conversation.save(), newMessage.save()]);
    
    const recieverSocketId = getRecieverSocketId(recieverID);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
      console.log("done from backend");
    }
    
   console.log("Message sent");
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in send Message Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async(req,res) => {
  try {
    
    const {id:userToChat} = req.params;
    const senderId = req.user._id;    

   const conversation = await Conversation.findOne({
    participants:{ $all: [userToChat, senderId]}
   }).populate("messages");
   
   if(!conversation) return res.status(200).json([]);

   const messages = conversation.messages;

   res.status(200).json(messages);

  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });

  }
} 


