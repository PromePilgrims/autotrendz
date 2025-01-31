import UserApi from '@/services/UserApi'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

interface UserContextData {
  user: App.UserProps | undefined
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export const UserProvider = ({ children }: UserProviderProps) => {
  const { isAuthenticated } = useAuth()
  const [user, setUser] = useState<App.UserProps>()

  useEffect(() => {
    if (isAuthenticated) {
      UserApi.me().then((res) => setUser(res.data))
    }
  }, [isAuthenticated])

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  return useContext(UserContext)
}
