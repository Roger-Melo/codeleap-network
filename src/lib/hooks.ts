import { useContext } from "react"
import { PostsContext } from "@/contexts/posts-context-provider"
import { UsernameContext } from "@/contexts/username-context-provider"

export function usePostsContext () {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error("useContext must be used within a PostsContextProvider")
  }

  return context
}

export function useUsernameContext () {
  const context = useContext(UsernameContext)
  if (!context) {
    throw new Error("useContext must be used within a UsernameContextProvider")
  }

  return context
}
