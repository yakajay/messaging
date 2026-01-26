
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, socket } = useAuthStore();
  const [typingStatus, setTypingStatus] = useState("");

  useEffect(() => {
    if (!socket) return;

    // 1-on-1 Typing Logic
    const handleTyping = ({ senderId }) => {
      // String comparison zaroori hai
      if (selectedUser && senderId?.toString() === selectedUser._id?.toString()) {
         setTypingStatus("Typing...");
      }
    };

    const handleStopTyping = ({ senderId }) => {
      if (selectedUser && senderId?.toString() === selectedUser._id?.toString()) {
        setTypingStatus("");
      }
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [socket, selectedUser]);

  //ROBUST ONLINE CHECK: .toString()
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id?.toString());

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-slate-200">{selectedUser.fullName}</h3>
            <p className="text-xs text-base-content/70">
              {typingStatus ? (
                <span className="text-cyan-400 font-semibold animate-pulse">{typingStatus}</span>
              ) : (
                <span className={isOnline ? "text-green-500" : "text-zinc-500"}>
                    {isOnline ? "Online" : "Offline"}
                </span>
              )}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;