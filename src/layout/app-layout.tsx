import AppWrapper from '@/components/shared/app-wrapper'
import Header from '@/components/shared/header'
import MiniSidebar from '@/components/shared/mini-sidebar'
import SideBarWrapper from '@/components/shared/sidebar-wrapper'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  
  return (
    <AppWrapper>
        <div className='flex flex-col h-screen'>
      <Header/>
        <div className='flex flex-1 min-h-0'>
           <MiniSidebar/>
          <SideBarWrapper/>
           <div className='flex-1 min-h-0'>
             <Outlet />
           </div>
        </div>
       </div>
    </AppWrapper>
  )
}

export default AppLayout