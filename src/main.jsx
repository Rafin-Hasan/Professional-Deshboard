import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext' // Import the provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Wrap App inside UserProvider */}
      <App />
    </UserProvider>
  </StrictMode>,
)