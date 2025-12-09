import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "sonner"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Toaster position="top-right" richColors />
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
