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
      createChat: (payload: CreateChatType) => Promise<ChatType | null>
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

             get().addNewChat( response.data.chat)
             toast.success("Chat created successfully!")
              return response.data.chat
           } catch(error: any) {
              toast.error(error?.response?.data?.message || 'Failed to create chats')
              return null
           } finally{
             set({isCreatingChat: false})
           }
     },
     fetchSingleChat: () => {
          set({isSigleChatLoading: true})
     },

    addNewChat: (newChat: ChatType) =>  {
       set((state) => {
         const existingChatIndex = state.chats.findIndex((c) => c._id == newChat._id)

          if(existingChatIndex !== -1){
             return {
               chats: [newChat, ...state.chats.filter((c) => c._id !== newChat._id)]
             }
          } else {
             return {
              chats: [newChat, ...state.chats]
             }
          }
       } 
      )
    }
 }))