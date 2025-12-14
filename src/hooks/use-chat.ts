import { API } from "@/lib/utils";
import type { UserType } from "@/types/auth.type";
import type { ChatType, CreateChatType, MessageType } from "@/types/chat.type";
import { toast } from "sonner";
import { create } from "zustand";

interface ChatState {
     chats: ChatType[]
     users: UserType[]
     sigleChat: {
        chat: ChatType
        message: MessageType[]
     } | null

      isChatLoading: boolean
      isUsersLoading: boolean
      isCreatingChat: boolean
      isSigleChatLoading: boolean

      fetchAllUser: () => void
      fetchChats: () => void
      createChat: (payload: CreateChatType | null) => void
      fetchSingleChat: (chatId: string) => void
      addNewChat: (newChat: ChatType) => void
    //   sendMessage: 
}

 
 export const useChat = create<ChatState>()((set, get) => ({
     chats: [],
     users: [],
     sigleChat: null,

     isChatLoading: false,
     isUsersLoading: false,
     isCreatingChat: false,
     isSigleChatLoading: false,

     fetchAllUser: async () => {
          set({isUsersLoading: true})

          try {
            const {data} = await API.get("/user/all")
            set({users: data.user})
          } catch (error: any) {
             toast.error(error?.response?.data?.message || 'Failed to fetch users')
          } finally {
            set({isUsersLoading: false})
          }
     },
     fetchChats: async() => {
          set({isChatLoading: true})

           try {
               const {data} = await API.get("/chat/all")
               set({chats: data.chats})
           }catch(error: any){
             toast.error(error?.response?.data?.message || 'Failed to fetch chats')
           } finally {
             set({isChatLoading: false})
           }
     },
     createChat: async (payload: CreateChatType) => {
          set({isCreatingChat: true})

           try {
             const response = await API.post("/chat/create", {
                ...payload
             })

              return re
           } catch(error: any) {

           }
     },
     fetchSingleChat: () => {
          set({isSigleChatLoading: true})
     },

    addNewChat: () => ({

    }) 
 }))