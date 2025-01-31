import { createContext, useContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextData {
  isAuthenticated: boolean | undefined
  token: string
  login: (token: string) => void
  logout: () => void
  checkUserIsAuthenticated: () => void
  userRole: number
  roleName: (role: number) => string
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()
  const [token, setToken] = useState('')
  const [userRole, setUserRole] = useState(0)

  const login = (token: string) => {
    setIsAuthenticated(true)

    setToken(token)
    localStorage.setItem('autotrendz_token', token)
    checkUserIsAuthenticated()
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('autotrendz_token')
    navigate('/')
  }

  const checkUserIsAuthenticated = () => {
    const localToken = localStorage.getItem('autotrendz_token')

    if (localToken !== null) {
      const decodedToken = atob(localToken.split('.')[1])
      const user = JSON.parse(decodedToken)
      setUserRole(user.role)

      setToken(localToken)
      setIsAuthenticated(true)
    }
  }

  const roleName = (role: number): string => {
    switch (role) {
      case 0:
        return 'Admin'
      case 1:
        return 'Cliente'
      case 2:
        return 'Supervisor de Questionários'
      case 3:
        return 'Entrevistador'
      default:
        return 'Desconhecido'
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        token,
        checkUserIsAuthenticated,
        userRole,
        roleName
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)

  return {
    ...ctx,
    isAdmin: ctx.userRole === 0,
    isUser: ctx.userRole === 1,
    isSupervisor: ctx.userRole === 2,
    isInterviewer: ctx.userRole === 3
  }
}
