import {navLink1, navLink2 } from '@/constants'
import { useAuth } from '@/hooks/use-auth'
import { X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

 interface Props {
  setSettingOpen: (v: boolean) => void;
  settingOpen: boolean
 }
const MiniSidebar = ({setSettingOpen, settingOpen}: Props) => {

   const path = useLocation()
   const {user} = useAuth()
         

  return (
     <div className="max-w-[70px] w-full flex flex-col p-2 items-center bg-[#F8FAFC] border rounded-l-md max-sm:hidden">
      <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center">
        <p className="font-semibold text-white">C</p>
      </div>

      <div className="flex flex-col justify-between mt-5 items-center m-1 flex-1 min-h-0">
        <div className="flex flex-col gap-4">
          {navLink1.map((nav, index) => (
            <div className={`${path.pathname.startsWith(nav.href) ? "bg-slate-200" : "bg-transparent"} p-2 rounded-md cursor-pointer hover:bg-slate-100`} key={index}>
              <nav.icon className="text-[#495568] size-5 font-bold" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 items-center">
          {navLink2.map((nav, index) => (
            <div className="p-2 rounded-md cursor-pointer hover:bg-slate-100" key={index}>
              <nav.icon className="text-[#495568] size-5" onClick={() => setSettingOpen(!settingOpen)}/>
            </div>
          ))}

          <div className="w-12 h-12 rounded-full  flex items-center justify-center cursor-pointer group relative" >
              
              <div className="w-10 h-10 rounded-full min-w-10 min-h-10 overflow-hidden shrink-0 bg-gray-200">
                <img src={user?.avatar ? user?.avatar : '/image/blank.png'} alt="profile-pic" className="w-full h-full object-cover rounded-full block"/>
              </div>

             
          </div>
        </div>
       
      </div>
    </div> 
  )
}

export default MiniSidebar