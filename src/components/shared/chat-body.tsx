import { useAuth } from "@/hooks/use-auth";
import { useChat } from "@/hooks/use-chat";
import { useSocket } from "@/hooks/use-socket";
import { cn } from "@/lib/utils";
import type { MessageType } from "@/types/chat.type";
import { useEffect, useRef } from "react";

interface Props {
    chatId: string | null;
    chatMessage: MessageType[]
    onReply: (message: MessageType) => void
};

const ChatBody = ({chatMessage, chatId, onReply}: Props) => {

    const {socket} = useSocket()
    const {addNewMessage} = useChat()
    

     const message = {
         sender: {
            _id: '1',
            name: 'Duru Pristine'
         },
         replyTo: {
             sender: {
            _id: '1',
            name: 'Duru Pristine'
         },
         }
     }

     useEffect(() => {
      if(!socket) return

      const handleNewMessage = (msg: MessageType) => addNewMessage(chatId, msg)

      socket.on("message:new", handleNewMessage)

      return () => {
         socket.off("message:new", handleNewMessage)
      }
    }, [socket, addNewMessage, chatId])

    useEffect(() => {
       bottomRef.current?.scrollIntoView({behavior: 'smooth'})

    }, [chatMessage])

    const {user} = useAuth()
    const userId = user?._id || null
    const isCurrentUser = message.sender._id === userId
    const senderName = isCurrentUser ? 'You' : message?.sender?.name

    const replySenderName = message.replyTo.sender._id === userId ? 'You' : message.replyTo.sender.name 

    const bottomRef = useRef<HTMLDivElement | null>(null)

    const containerClass = cn("group flex gap-2 py-3 px-4", isCurrentUser && "flex-row-reverse text-left")

    const contentWrapperClass = cn(
      "max-w-[70%] flex flex-col relative",
      isCurrentUser && 'items-end'
    )

    const messageClass = cn(
      "min-w-[200px] px-3 py-2 text-sm break-words shadow-sm",
      isCurrentUser ? 'bg-accent rounded-tr-xl rounded-l-xl' : 'bg-[#F5F5F5] dark:bg-primary/40 rounded-bl-xl rounded-r-xl'
    )

    const replyBoxClass = cn(
       'mb-2 p-2 text-xs rounded-md border-l-4 shadow-md !text-left', isCurrentUser ? "bg-primary/20 border-l-primary" : "bg-gray-200 dark:bg-secondary border-l-[#CC4A31]"
    )

  return (
    <div className="px-10 max-sm:px-5 pt-5 flex-1 min-h-0 overflow-y-auto chat-scroll">
        <div className="flex flex-col gap-5">
          {chatMessage?.length > 0 ? chatMessage.map((chat, index) => (
            <div key={index} className="flex gap-3">
              <div className={`w-12 h-12 rounded-full ${chat?.color}`}></div>

              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">
                  {chat.name}{" "}
                  <span className="text-xs ml-2 text-[#8B92A1]">{chat.time}Am</span>
                </p>

                <div className="bg-[#F9FBFC] p-2 rounded-lg max-w-md">
                  <p className="text-[#8B92A1] text-sm leading-6">{chat.text}</p>
                </div>

                {chat.image && (
                  <img
                    src={chat.image}
                    className="rounded-md border-[3px] border-gray-200"
                  />
                )}
              </div>
            </div>
          )) : ''}
        </div>
      </div>
  )
}

export default ChatBody