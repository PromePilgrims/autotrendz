import { YmhQuestionnaire } from '@/services/YmhQuestionnaire'
import React, { ReactNode, createContext, useContext } from 'react'

interface ContactContextProps {
  contact: YmhQuestionnaire.Contact
}

const ContactContext = createContext({} as ContactContextProps)

interface ContactProviderProps {
  contact: YmhQuestionnaire.Contact
  children: ReactNode
}

export const ContactProvider: React.FC<ContactProviderProps> = ({
  contact,
  children
}) => {
  return (
    <ContactContext.Provider value={{ contact }}>{children}</ContactContext.Provider>
  )
}

export function useContact() {
  const context = useContext(ContactContext)
  return context
}
