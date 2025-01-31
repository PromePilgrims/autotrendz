import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

const getBasename = () => {
  if (window.location.pathname.startsWith('/my-extranet')) {
    return '/my-extranet'
  }
  return '/'
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={getBasename()}>
    <React.StrictMode>
      <AuthProvider>
        <UserProvider>
          <App />
          <Toaster />
        </UserProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
)
