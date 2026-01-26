import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // 1. Get Sidebar Users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // 2. Get Messages
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // 3. Send Message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      
      set({ messages: [...messages, res.data] });

      const socket = useAuthStore.getState().socket;
      socket.emit("newMessage", res.data); 

    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  //  4. DELETE MESSAGE FUNCTION 
  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/${messageId}`);
      
      // UI se message hatao
      set((state) => ({
        messages: state.messages.filter((message) => message._id !== messageId),
      }));

      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },

  // 5. Real-time Message Listener
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("messageReceived");

    socket.on("messageReceived", (newMessage) => {
      const { selectedUser } = get();
      if (!selectedUser) return;

      const isMessageForCurrentChat = 
        newMessage.chat?._id === selectedUser._id || 
        newMessage.sender._id === selectedUser._id;

      if (!isMessageForCurrentChat) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("messageReceived");
  },

  // 6. Select Chat
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
