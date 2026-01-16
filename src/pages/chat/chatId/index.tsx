import ChatBody from "@/components/shared/chat-body"
import ChatFooter from "@/components/shared/chat-footer"
import ChatList from "@/components/shared/chat-list"
import { useAuth } from "@/hooks/use-auth"
import { useChat } from "@/hooks/use-chat"
import useChatId from "@/hooks/use-chat-id"
import { useSocket } from "@/hooks/use-socket"
import { getOtherUserAndGroup } from "@/lib/utils"
import type { MessageType } from "@/types/chat.type"
import {Search, Phone, Loader2, Menu, X} from "lucide-react"
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react"

const SingleChat = () => {
   
  const chatId = useChatId()
  const {fetchSingleChat, isSingleChatLoading, singleChat, chats, isChatLoading,} = useChat()
  const navigate = useNavigate();
  const {socket} = useSocket()
  const {user} = useAuth()

  const [replyTo, setReplyTo] = useState<MessageType | null>(null)

  const currentUser = user?._id || null
  const chat = singleChat?.chat
  const messages = singleChat?.messages || []
  const isAIChat = chat?.isAiChat || false

  const {name, subheading, avatar, isOnline, isGroup} = getOtherUserAndGroup(chat, currentUser)


   const [open, setOpen] = useState(false)
     const [activeNav, setActiveNav] = useState<string | null>(null)
     const panelRef = useRef<HTMLDivElement>(null)
     const onRoute = (id: string) => navigate(`/chat/${id}`);
   
     // close on outside click
     useEffect(() => {
       const handler = (e: MouseEvent) => {
         if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
           setOpen(false)
           setActiveNav(null)
         }
       }
   
       if (open) document.addEventListener('mousedown', handler)
       return () => document.removeEventListener('mousedown', handler)
     }, [open])

  useEffect(() => {
     if(!chatId) return

      fetchSingleChat(chatId)
  }, [fetchSingleChat, chatId])
   
  useEffect(() => {
       if(!chatId && !socket) return

       socket?.emit('chat:join', chatId)

       return () => {
         socket?.emit('chat:leave', chatId)
       }
  }, [chatId, socket])

   if(isSingleChatLoading) {
    return (
      <div className="inset- h-full flex items-center justify-center">
       <Loader2 className="size-14 text-gray-400 animate-spin"/>
      </div>
    )
   }

   if(!chat) {
    return (
      <div className="inset- h-full flex items-center justify-center">
        <p className="text-lg text-gray-500">Chat not found!</p>
      </div>
    )
   }

  
    
  return (
    <div className="flex flex-col h-full min-h-0">
  <div className="flex flex-1 min-h-0">
    {/* RIGHT CHAT VIEW */}
    <div className="w-full border-t border-b border-r flex flex-col rounded-r-md flex-1 min-h-0">
      {/* Chat Header */}
      <div className="sm:p-10 p-5 h-20 border flex items-center rounded-tr-md">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full min-w-10 min-h-10 overflow-hidden shrink-0 bg-gray-200">
                <img src={avatar ? avatar : '/image/blank.png'} alt="profile-pic" className="w-full h-full object-cover rounded-full block"/>
              </div>

            <div className="flex flex-col">
              <p className="text-sm font-semibold mb-px">{name}</p>
              <p className="text-xs text-green-400">
               {subheading} 
              </p>
              {/* <p className="text-xs text-green-400 animate-pulse">Typing...</p> */}
            </div>

            {/* <p className="text-xs text-[#8B92A1] sm:hidden">
              187 People
            </p> */}
          </div>

          <div className="flex items-center gap-3">
            <div className={` py-0.5 px-2.5 rounded-[20px] border ${isOnline ? 'border-green-300 bg-[#EDFFF2]' : 'border-muted-foreground bg-gray-50'} hidden sm:block`}>
              <p className={`${isOnline ? 'text-green-400' : 'text-muted-foreground'} `}>{subheading}</p>
            </div>
            <Search className="text-[#495568] size-6 cursor-pointer" />
            <Phone className="text-[#495568] size-6 cursor-pointer" />
            <div className="p-2 rounded-full sm:hidden block" onClick={() =>
                {setOpen(true)}}>
              <Menu className="size-6 text-[#495568] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* SCROLLABLE MESSAGES */}
       <ChatBody chatMessage={messages} chatId={chatId} onReply={setReplyTo}/>

      {/* INPUT BAR */}
      <ChatFooter 
       replyTo={replyTo}
       chatId={chatId}
       isAIChat={isAIChat}
       currentUserId={currentUser}
       onCancelReply={() => setReplyTo(null)}
      />
    </div>
  </div>

  <div
        ref={panelRef}
        className={`
          absolute top-0 left-0 ml- h-full max-w-[350px] w-full
          bg-white border rounded-md shadow-lg z-50
          transform transition-all duration-300 ease-out
          ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0 pointer-events-none'}
        `}
      >
         <div className="flex flex-col">

        <div className="flex items-center justify-between p-3 border-b">
          <p className="font-medium text-sm">ChatSphere</p>
          <X
            className="size-4 cursor-pointer"
            onClick={() => {
              setOpen(false)
              setActiveNav(null)
            }}
            />
            </div>

            
        </div>

        <div className="p-3 text-sm text-slate-600">
        <div className="flex-1 min-h-0 overflow-y-auto chat-scroll h-full">
        <div className="flex flex-col h-full">
          {isChatLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="size-10 animate-spin text-gray-400" />
            </div>
          ) : chats?.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-sm font-semibold">No chats found create one!</p>
            </div>
          ) : (
            chats?.map(chat => (
              <ChatList key={chat._id} chat={chat} onClick={() => onRoute(chat._id)} currentUserId={currentUser} />
            ))
          )}
        </div>
      </div>
        </div>
      </div>
</div>
  )
}

export default SingleChat