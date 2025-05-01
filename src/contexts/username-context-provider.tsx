"use client"

import { createContext, useState } from "react"
import { getStoredUsername, setUsernameOnStorage } from "@/lib/local-storage"

type UsernameContextType = {
  usernameState: string
  setUsername: (username: string) => void
}

type UsernameContextProviderProps = {
  children: React.ReactNode
}

export const UsernameContext = createContext<UsernameContextType | null>(null)

export function UsernameContextProvider({ children }: UsernameContextProviderProps) {
  const [usernameState, setUsernameState] = useState(() => getStoredUsername())

  function setUsername(username: string) {
    setUsernameOnStorage(username)
    setUsernameState(username)
  }

  return (
    <UsernameContext.Provider value={{ usernameState, setUsername }}>
      {children}
    </UsernameContext.Provider>
  )
}
