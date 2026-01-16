import { navLink1, navLink2 } from '@/constants'
import { useAuth } from '@/hooks/use-auth'
import {Suspense } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
  setSettingOpen: (v: boolean) => void
  settingOpen: boolean
}

const MiniSidebar = ({ setSettingOpen, settingOpen }: Props) => {
  const path = useLocation()
  const { user } = useAuth()

   
  

  return (
    <div className="max-w-[70px] w-full flex flex-col p-2 items-center 
      bg-[#F8FAFC] border rounded-l-md max-sm:hidden relative overflow-visible"
    >
      {/* Logo */}
      <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center">
        <p className="font-semibold text-white">C</p>
      </div>

      <div className="flex flex-col justify-between mt-5 items-center m-1 flex-1 min-h-0">
        {/* Top nav */}
        <div className="flex flex-col gap-4">
          {navLink1.map((nav, index) => (
            <div
              key={index}
              className={`p-2 rounded-md cursor-pointer hover:bg-slate-100
                ${path.pathname.startsWith(nav.href) ? 'bg-slate-200' : ''}`}
            >
              <nav.icon className="text-[#495568] size-5 font-bold" />
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="flex flex-col gap-4 items-center">
          {navLink2.map((nav, index) => (
            <div key={index} className="p-2 rounded-md cursor-pointer hover:bg-slate-100">
              <nav.icon
                className="text-[#495568] size-5"
                onClick={() => nav.label === 'Setting' && setSettingOpen(!settingOpen)}
              />
            </div>
          ))}

          {/* Avatar */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <Suspense fallback={<div>Loading image...</div>}>
      <img src={user?.avatar ?? '/image/blank.png'}  alt="profile"
                className="w-full h-full object-cover" />
        </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE-OUT PANEL */}
     
    </div>
  )
}

export default MiniSidebar
