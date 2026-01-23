import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Trash } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    deleteMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser, socket } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    if (socket) {
        socket.emit("joinChat", selectedUser._id);
    }

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages, socket]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const messageSenderId = message.sender?._id || message.senderId || message.sender;
          const isOwnMessage = messageSenderId?.toString() === authUser._id?.toString();
          
          return (
            <div
              key={message._id}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      isOwnMessage
                        ? authUser.profilePic || "/avatar.png"
                        : message.sender?.profilePic || selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              
              <div className="chat-header mb-1">
                 {!isOwnMessage && (
                    <span className="text-xs font-bold opacity-70 mr-2">
                        {message.sender?.fullName || selectedUser.fullName}
                    </span>
                 )}
              </div>

              <div className="chat-bubble flex flex-col relative group">
                {message.image && message.image.trim() !== "" && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                
                {(message.content || message.text) && (
                    <p>{message.content || message.text}</p>
                )}

                {isOwnMessage && (
                  <button
                    onClick={() => deleteMessage(message._id)}
                    className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 bg-base-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-base-300 hover:bg-red-100"
                    title="Delete Message"
                  >
                    <Trash size={14} className="text-red-500" />
                  </button>
                )}
              </div>

              <div className="chat-footer text-xs text-zinc-300 mt-1 ml-1 font-medium">
                {formatMessageTime(message.createdAt)}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;