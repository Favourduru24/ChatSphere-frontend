import { useAuth } from "@/hooks/use-auth";
import { getOtherUserAndGroup, formatCustomDate } from "@/lib/utils";
import type { ChatType } from "@/types/chat.type"

 interface PropsType {
   chat: ChatType;
   onClick?: () => void,
   currentUserId: string | null
 }

const ChatList = ({chat, onClick, currentUserId}: PropsType) => {


    const {lastMessage, createdAt, createdBy} = chat || {}

    const {name, avatar, isOnline, isGroup} = getOtherUserAndGroup(chat, currentUserId)

const getLastMessage = () =>  {
     if(!lastMessage) {
         return isGroup 
         ? createdBy === currentUserId 
         ? "Group created" : 'You were added' : "Send a message"
     }

     if(lastMessage.image) return "Photo"
     if(isGroup && lastMessage.sender) {
       return `${lastMessage.sender._id === currentUserId ? 'You' : lastMessage.sender.name} : ${lastMessage.content} `
     }

     return lastMessage.content
}

  return (
    <div
              className="h-20 flex items-center cursor-pointer hover:bg-[#EDF2FE]"
            onClick={onClick}>
              <div className="w-full p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-center">
                     <div className="w-10 h-10 rounded-full min-w-10 min-h-10 overflow-hidden shrink-0 bg-gray-200">
                <img src={avatar ? avatar : '/image/blank.png'} alt="profile-pic" className="w-full h-full object-cover rounded-full block"/>
              </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold truncate">{name}</p>
                      <p className="text-xs text-[#8B92A1] truncate max-w-[200px]">{getLastMessage()}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#CCCFD9]">{formatCustomDate(createdAt)}</p>
                </div>
              </div>
            </div>
  )
}

export default ChatList