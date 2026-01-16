import { useLocation } from 'react-router-dom'
import './App.css'
import { useAuth } from './hooks/use-auth'
import AppRoutes from './routes'
import { useEffect } from 'react'
import { isAuthRoutes } from './routes/routes'
import { useSocket } from './hooks/use-socket'
import { Loader } from 'lucide-react'

function App() {

    const {user, isAuthStatus, isAuthStateLoading} = useAuth()
    const {pathname} = useLocation()

    const isAuth = isAuthRoutes(pathname)


    useEffect(() => {
       if(!isAuth) {
         isAuthStatus()  
        }
    }, [isAuthStatus, isAuth])



     if(isAuthStateLoading && !user && !isAuth){
         <div className='fixed inset-0 bg-black flex flex-col items-center justify-center z-10'>
           <Loader className='size-8'/>
         </div>
     }

  return (
       <AppRoutes />
  )
}

export default App

