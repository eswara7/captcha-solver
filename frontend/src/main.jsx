import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { DarkModeProvider } from './context/DarkModeContext'


createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </DarkModeProvider>
  
)
