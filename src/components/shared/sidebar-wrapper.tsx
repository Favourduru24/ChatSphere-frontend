import { chatData, chaty } from '@/constants'
import { useChat } from '@/hooks/use-chat'
import { PenBox, Users2Icon, ArrowLeft, Camera, Plus, Loader2} from 'lucide-react'
import  { useEffect, useRef, useState } from 'react'
import ChatList from './chat-list'
import type { ChatType } from '@/types/chat.type'
import {  useNavigate} from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import Search from './search'

const SideBarWrapper = () => {
     
   //chat logic state
   const {fetchAllUser, fetchChats, chats, isChatLoading} = useChat()

   const {user} = useAuth()
    const currentUserId = user?.id || null

   const navigate = useNavigate()
   const [searchQuery, setSearchQuery] = useState('')

   const onRoute = (id: string) => {
     navigate(`/chat/${id}`)
   }

   const filteredChats = chaty?.filter((chat) => chat.groupName?.toLowerCase().includes(searchQuery.toLowerCase()) || chat.participants?.some((p) => p.id !== currentUserId && p.name?.toLowerCase().includes(searchQuery.toLowerCase()))) || []

   
        
  //Component state
       const [open, setOpen] = useState(false)
       const [isGroupOpen, setIsGroupOpen] = useState(false)
       const [createGroupModal, setCreateGroupModal] = useState(false)
       const chatModalRef = useRef<HTMLDivElement | null>(null)
    
        const toggleOpen = () => setOpen((p) => !p);
       const toggleCreateGroup = () => setCreateGroupModal((p) => !p);

        useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (chatModalRef.current && !chatModalRef.current.contains(e.target)) {
            setOpen(false)
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }, [])
    

       useEffect(() => {
        fetchChats()
   }, [fetchChats])

   console.log(chats)

  return (
    <div className="max-w-[350px] w-full flex-col bg-[#F9FBFC] border hidden lg:flex relative">
      {/* Title */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">chatSphere</p>
                    <p className="text-sm text-slate-400">Recent conversations</p>
                  </div>
                  <PenBox className="size-5 text-slate-600 cursor-pointer" onClick={toggleOpen}/>
                </div>

      {/* Chat List Header */}
      <div className="p-4 h-14 flex items-center w-full">
         <div className="py-3 border-b flex items-center justify-between w-full">
            <div className="text-sm text-slate-500">
              <span className="font-medium text-slate-700">23</span> people
            </div>
            <div className="text-sm text-slate-400">Sort: Recent</div>
          </div>

         {open && (
  <div
    aria-modal="true"
    className="absolute  top-20 left-[50%] max-w-[350px] w-full bg-white border rounded-lg shadow-lg flex flex-col h-[85%] min-h-0 z-20"
    ref={chatModalRef}
  >
    {/* GROUP MODAL */}
    {isGroupOpen && (
      <div className="absolute inset-0 bg-white flex flex-col min-h-0 rounded-lg">
        
        {/* Header */}
         <div className="px-3 py-3 border-b flex items-center gap-3">
          <button onClick={() => setIsGroupOpen(false)} className="p-2 rounded-md hover:bg-slate-100">
            <ArrowLeft className="size-5" />
            </button>
          <h3 className="text-lg font-semibold">New group</h3>
           </div>

        {/* Search */}
        <div className="px-4 pt-3">
                       <Search placeholder="Search name or email" value={searchQuery} setChange={setSearchQuery}/>
                      <p className="text-sm text-slate-500 mb-2">All contacts</p>
                    </div>

        {/* SCROLLABLE CONTACT LIST */}
        <div className="flex-1 min-h-0 overflow-y-auto chat-scroll">
          <div className="flex flex-col">
            {chatData.map((chat, index) => (
              <div key={index} className="h-16 flex items-center cursor-pointer hover:bg-[#EDF2FE]">
                <div className="w-full p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className={`shrink-0 w-12 h-12 rounded-full ${chat.color} flex items-center justify-center`}/>
                      <div>
                        <p className="text-sm font-semibold truncate">{chat.name}</p>
                        <p className="text-xs text-[#8B92A1]">{chat.text}</p>
                      </div>
                    </div>
                    <input type="checkbox" className="size-3 accent-[#8E8AD8] cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 border-t flex gap-2 items-center justify-between">
                      <button className="w-full py-2 bg-purple-600 text-white rounded-md font-semibold cursor-pointer" onClick={toggleCreateGroup}>Next</button>

                      <button className="w-full py-2 bg-[#e6eaec] text-black rounded-md font-semibold cursor-pointer" onClick={() => setIsGroupOpen(false)}>Cancel</button>
                    </div>
                  </div>
       
    )}
           {createGroupModal && ( <div className="absolute inset-0 bg-white flex flex-col min-h-0 rounded-lg">
            <div className="px-3 py-3 border-b flex items-center gap-3">
          <button onClick={toggleCreateGroup} className="p-2 rounded-md hover:bg-slate-100">
            <ArrowLeft className="size-5" />
            </button>
          <h3 className="text-lg font-semibold">New group</h3>
           </div>
                <div className="h-full flex flex-col justify-between">
                  <div className="flex flex-col">

             <div className="flex items-center w-full px-4 py-5 gap-2 ">
                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100">
                     <Camera className="size-4"/>
                   </div>
                     <p className="text-sm">Add a group icon <span className="text-gray-400">(optional)</span></p>
             </div>
                  
              <div className="flex flex-col w-full px-4 gap-2 ">
                     <p className="text-sm">Provide a group name</p>
                        <Search placeholder="Group name (optional)" value={searchQuery} setChange={setSearchQuery}/>
                  </div>

                   
              </div>
               <div className="p-3 border-t flex gap-2 items-center justify-between">
                      <button className="w-full py-2 bg-purple-600 text-white rounded-md font-semibold cursor-pointer">Create</button>

                      <button className="w-full py-2 bg-[#e6eaec] text-black rounded-md font-semibold cursor-pointer" onClick={toggleCreateGroup}>Cancel</button>
                    </div>
                </div>
           </div>)}
    {/* MAIN CHAT SCREEN */}
    <div className="flex flex-col min-h-0 h-full">

      {/* Header */}
     <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">New Chat</h2>
        <div className="flex items-center gap-2">
         <button className="p-2 rounded-md hover:bg-slate-100" onClick={() => setIsGroupOpen(true)} title="Create group">
           <Users2Icon className="size-5" />
                             </button>
         <button className="p-2 rounded-md hover:bg-slate-100" title="Add">
                               <Plus className="size-5" />
                             </button>
       </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2">
                      <form className="border-b border-[#E6E6FA]">
                        <input className="w-full h-9 px-2 outline-none" placeholder="Search name or email" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                      </form>
                    </div>

      {/* Options */}
       

      {/* MAIN SCROLL AREA */}
      <div className="flex-1 min-h-0 overflow-y-auto chat-scroll">
        <div className="flex flex-col">
          {/* {chatData.map((chat, index) => (
            <div key={index} className="h-16 flex items-center cursor-pointer hover:bg-[#EDF2FE]">
              <div className="w-full p-4">
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <div className={`w-10 h-10 rounded-full ${chat.color}`}></div>
                    <div>
                      <p className="text-sm font-semibold">{chat.name}</p>
                      <p className="text-xs text-[#8B92A1]">{chat.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))} */}

          {isChatLoading ? (
             <div className='inset-0 flex items-center justify-center w-full h-full'>
             <Loader2 className='size-10 animate-spin text-gray-400'/>
             </div>
             ) : filteredChats?.length === 0 ? ( <div className='inset-0 flex items-center justify-center w-full h-full'>
              <p className='text-sm font-semibold'>No Chats found!</p>
             </div>

             ) : filteredChats?.map((chat) => (
            <ChatList key={chat._id} chat={chat} onClick={() => onRoute(chat._id)} currentUserId={currentUserId}/>
          ))}
        </div>
      </div>

    </div>
  </div>
)}

      </div>

      {/* Scrollable Chat List */}
      <div className="flex-1 min-h-0 overflow-y-auto chat-scroll h-full">
        <div className="flex flex-col h-full">
          {isChatLoading ? (
             <div className='inset-0 flex items-center justify-center w-full h-full'>
             <Loader2 className='size-10 animate-spin text-gray-400'/>
             </div>
             ) : filteredChats?.length === 0 ? ( <div className='inset-0 flex items-center justify-center w-full h-full'>
              <p className='text-sm font-semibold'>No Chats found!</p>
             </div>

             ) : filteredChats?.map((chat) => (
            <ChatList key={chat._id} chat={chat} onClick={() => onRoute(chat._id)} currentUserId={currentUserId}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBarWrapper