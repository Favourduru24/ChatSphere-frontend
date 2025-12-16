import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"
import type { ChatType } from "@/types/chat.type"
import { useSocket } from "@/hooks/use-socket"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API = axios.create({
   baseURL: import.meta.env.MODE === 'development' 
   ? `${import.meta.env.VITE_API_URL}/api`
   : '/api',
   withCredentials: true
})

 export const isUserOnline = (userId: string) => {
   
   if(!userId) return false
   const {onlineUsers} = useSocket.getState()

   return onlineUsers.includes(userId)
 }

export const getOtherUserAndGroup = (chat: ChatType, currentUserId: string | null) => {
         
     const isGroup = chat?.isGroup

     if(isGroup) {
      return {
         name: chat.groupName || 'Unnamed Group',
         subheading: `${chat.participants.length} members`,
         avatar: " ",
         isGroup
      }
     }

     const other = chat?.participants?.find((p) => p.id !== currentUserId)

      const isOnline = isUserOnline(other?.id ?? '')

     return {
      name: other?.name || 'Unknown',
      subheading:  isOnline ? "Online" : "Offline",
      avatar: other?.avatar || '',
      isGroup: false,
      isOnline
     }
}

export const formatChatTime = (date: string | Date) => {
 return date
 }