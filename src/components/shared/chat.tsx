import Header from "./header"
import {Sparkle, Calendar, Menu, Plus} from "lucide-react"

const Chat = () => {

   const navLink = [
    {
      icon: Calendar
    },
    {
      icon: Sparkle
    },
   ]
  return (
    <div className="flex flex-col h-full">
     <Header />
      <div className="flex h-full">
         {/* First cols */}
         <div className="max-w-[50px] w-full border flex flex-col p-2 items-center bg-[#F9FBFC]">
            <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center whitespace-nowrap shrink-0">
               <p className="font-semibold text-white">C</p>
            </div>
            <div className="gap-4 flex flex-col justify-between h-full mt-10">
               <div className="flex flex-col gap-4">
                       {navLink.map((nav) => (
                       <div >
                         <nav.icon className="text-[#495568] size-5"/>
                       </div>
                ))}
               </div>

               <div className="flex flex-col gap-4">
                       {navLink.map((nav) => (
                       <div >
                         <nav.icon className="text-[#495568] size-5"/>
                       </div>
                ))}
               </div>
                
            </div>
         </div>
         {/*Second cols */}
         <div className="max-w-[270px] border w-full flex-col">
           <div className="p-2 h-14 border flex items-center bg-[#F9FBFC]">
               <div className="flex justify-between gap- items-center w-full">
                  <p className="text-lg font-semibold">chatSphere</p>
                  <Menu className="text-[#495568] size-5 mt-1 font-semibold"/>
               </div>
           </div>

             <div className="flex flex-col bg-[#F9FBFC] h-full">
                <div className="p-2 h-14 flex items-center">
                   <div className="flex justify-between gap- items-center w-full">
                  <p className="text-lg font-semibold text-[#8B92A1]">Chats <span className="bg-pink-300 rounded-full text-sm text-pink-400">23</span></p>
                  <Plus className="text-[#495568] size-6 mt-1 font-semibold cursor-pointer"/>
               </div>
                </div>

                <div className="p-2 h-16 flex items-center bg-[#F9FBFC]">
               <div className="flex justify-between gap-3 items-start w-full">
                 <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center whitespace-nowrap shrink-0">
                  </div>
                  <div className="flex flex-col ">
                        <p className="text-md font-semibold text-black">Favour Duru</p>
                        <p className="text-sm font-semibold text-[#8B92A1]">Favour howfar na</p>
                        <p></p>
                  </div>
                 </div>
                 
                <p className="text-xs font-semibold text-[#CCCFD9]">12:52</p>

               </div>
           </div>
             </div>

             
         </div>

         {/*Third cols */}
         <div className="w-full border">
          n
         </div>

      </div>
    </div>
  )
}

export default Chat