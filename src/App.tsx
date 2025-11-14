import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chat from './components/shared/chat'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div className='h-screen'>
       <Chat />
     </div>
  )
}

export default App

