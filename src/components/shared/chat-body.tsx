import { useAuth } from "@/hooks/use-auth";
import { useChat } from "@/hooks/use-chat";
import { useSocket } from "@/hooks/use-socket";
import {formatCustomDate} from "@/lib/utils";
import type { MessageType } from "@/types/chat.type";
import { ReplyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Response } from "./ai-response";
import {RiCircleFill} from "@remixicon/react"

interface Props {
    chatId: string | null;
    chatMessage: MessageType[]
    onReply: (message: MessageType) => void
};

const ChatBody = ({chatMessage, chatId, onReply}: Props) => {

    const {socket} = useSocket()
    const {addNewMessage, addOrUpdateMessage} = useChat()
    const {user} = useAuth()
    const userId = user?._id || null
    const bottomRef = useRef<HTMLDivElement | null>(null)
    const [_, setAiChunk] = useState<string>('')
    
      //  const message
    //  const message = {
    //      sender: {
    //         _id: '6938f28cc486d7352f0fd7d9',
    //         name: 'Duru Pristine'
    //      },
    //      replyTo: {
    //          sender: {
    //         _id: '1',
    //         name: 'Duru Pristine'
    //      },
    //      }
    //  }

     useEffect(() => {
      if(!socket) return

      const handleNewMessage = (msg: MessageType) => addNewMessage(chatId, msg)

      socket.on("message:new", handleNewMessage)

      return () => {
         socket.off("message:new", handleNewMessage)
      }
    }, [socket, addNewMessage, chatId])

    useEffect(() => {
      if(!socket) return
      if(!chatId) return

        const handleAIStream = ({
          chatId: streamChatId,
          chunk,
          done,
          message,
        }: any) => {

           if(streamChatId !== chatId) return
           
           const lastMsg = chatMessage.at(-1)

           if(!lastMsg?._id && lastMsg?.streaming) return 

           if(chunk?.trim() && !done) {
             setAiChunk((prev) => {
              const newContent = prev + chunk

              addOrUpdateMessage(
                chatId,
                {
                  ...lastMsg,
                  content: newContent
                } as MessageType,
                lastMsg?._id
              )

              return newContent
             })
             return
           }
              if(done) {
                 console.log('AI fullmessage', message)
                 setAiChunk(' ')
              }
      }

      socket.on("chat:ai", handleAIStream)

      return () => {
        socket.off("chat:ai", handleAIStream)
      }

    }, [socket, chatMessage, socket, chatId])

    useEffect(() => {
       bottomRef.current?.scrollIntoView({behavior: 'smooth'})

    }, [chatMessage])

    
    // const replySenderName = message.replyTo.sender._id === userId ? 'You' : message.replyTo.sender.name 

  return (
    <div className="px-10 max-sm:px-5 pt-5 flex-1 min-h-0 overflow-y-auto chat-scroll">
        <div className="flex flex-col gap-8">
          {chatMessage?.length > 0 ? chatMessage.map((chat, index) => (
            <div className={`${chat.sender?._id === userId ? 'flex justify-end' : 'flex justify-start'}`}>

            <div key={index} className="flex gap-3 ">
              <div className="w-10 h-10 rounded-full min-w-10 min-h-10 overflow-hidden shrink-0 bg-gray-200">
                <img src={chat?.sender?.avatar ? chat?.sender?.avatar : '/image/blank.png'} alt="profile-pic" className="w-full h-full object-cover rounded-full block"/>
              </div>

              <div className={`flex flex-col ${chat?.replyTo && 'flex-col-reverse'}  `}>
                <div className="flex flex-col gap-1 ">
                   <p className="text-sm font-semibold">
                  {chat?.sender?._id === userId ? 'You' : chat?.sender?.name} {" "}
                  <span className="text-xs ml-2 text-[#8B92A1] font-medium">{formatCustomDate(chat.createdAt)
}</span>
                </p>

                <div className={`p-2 max-w-md group relative ${chat?.sender?._id === userId ? 'rounded-tr-xl rounded-l-xl bg-[#F9FBFC]' : 'rounded-bl-xl rounded-r-xl bg-[#F5F5F5]'}`}>
                  
                  <p className="text-[#8B92A1] text-sm leading-6"><Response>{chat?.content}</Response></p>

                  {chat?.streaming &&  (
                    <span >
                      <RiCircleFill className="w-4 h-4 animate-bounce rounded-full dark::text-white mt-1"/>
                    </span>
                  )}

                   <button className="flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full size-8 bg-gray-50 cursor-pointer absolute -right-10 top-0" onClick={() => onReply(chat)}>
                  <ReplyIcon className="text-gray-500 stroke-[1.9]" size={16} />
                  </button>
                </div>

                {chat.image && (
                  <div className="w-80 h-50 rounded-md min-w-10 min-h-10 overflow-hidden shrink-0 bg-gray-200">
                  <img
                  src={chat.image}
                  className="border-[3px] border-gray-200 rounded-md object-center"
                  />
                  </div>
                )}
                </div>

                {chat?.replyTo && (
                    <div className={`flex flex-col  mb-2 p-2 text-xs rounded-md border-l-4 text-left max-w-md ${chat?.sender?._id === userId ? "bg-primary/20 border-l-[#8E8AD8]" : "bg-[#F1EFFF] dark:bg-secondary border-l-[#CC4A31z]"}
                    `}>
                      <p className="font-semibold text-xs">{chat?.replyTo?.sender?._id === userId ? 'You' : chat?.replyTo?.sender?.name }</p>
                       <p className="text-[#8B92A1] text-sm leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa distinctio, quibusdam, ratione delectus veniam nesciunt dolor magni iusto dolores laudantium optio dolorem enim possimus ab! Repellendus alias quidem explicabo tempore.</p>
                    </div>
                )}
              </div>
                
                 
                  </div>
            </div>
          )) : ''}
        </div>
        <div ref={bottomRef}/>
      </div>
  )
}

export default ChatBody