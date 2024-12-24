import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  let localStream = null;
  let peerConnection = null;

  const config = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  const startMedia = async () => {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const startCall = (receiverId) => {
    peerConnection = new RTCPeerConnection(config);

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, receiverId });
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnection
      .createOffer()
      .then((offer) => {
        peerConnection.setLocalDescription(offer);
        socket.emit("offer", { offer, receiverId });
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:3000", {
        query: { userId: authUser._id },
      });

      newSocket.on("connect", () => {
        console.log("Connected:", newSocket.id);
      });

      newSocket.on("getOnlineUsers", setOnlineUsers);

      setSocket(newSocket);

      newSocket.on("offer", ({ offer, senderId }) => {
        peerConnection = new RTCPeerConnection(config);
        localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream);
        });

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            newSocket.emit("ice-candidate", { candidate: event.candidate, receiverId: senderId });
          }
        };

        peerConnection.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        peerConnection
          .setRemoteDescription(new RTCSessionDescription(offer))
          .then(() => peerConnection.createAnswer())
          .then((answer) => {
            peerConnection.setLocalDescription(answer);
            newSocket.emit("answer", { answer, senderId });
          })
          .catch(console.error);
      });

      newSocket.on("answer", ({ answer }) => {
        peerConnection?.setRemoteDescription(new RTCSessionDescription(answer));
      });

      newSocket.on("ice-candidate", ({ candidate }) => {
        peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
      });

      return () => {
        newSocket.close();
        if (peerConnection) peerConnection.close();
        if (localStream) localStream.getTracks().forEach((track) => track.stop());
      };
    }
  }, [authUser]);

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, startCall, startMedia, localVideoRef, remoteVideoRef }}
    >
      {children}
    </SocketContext.Provider>
  );
};
