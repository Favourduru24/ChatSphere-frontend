import AppWrapper from '@/components/shared/app-wrapper'
import ChatSetting from '@/components/shared/chat-setting'
import Header from '@/components/shared/header'
import MiniSidebar from '@/components/shared/mini-sidebar'
import SideBarWrapper from '@/components/shared/sidebar-wrapper'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {

       const [settingOpen, setSettingOpen] = useState(false)

  return (
    <AppWrapper>
        <div className='flex flex-col h-screen relative'>
      <Header/>
        <div className='flex flex-1 min-h-0'>
           <MiniSidebar setSettingOpen={setSettingOpen} settingOpen={settingOpen}/>
          <SideBarWrapper/>
           <ChatSetting settingOpenModal={settingOpen} setSettingOpenModal={setSettingOpen}/>
           <div className='flex-1 min-h-0'>
             <Outlet />
           </div>
        </div>
       </div>
    </AppWrapper>
  )
}

export default AppLayout