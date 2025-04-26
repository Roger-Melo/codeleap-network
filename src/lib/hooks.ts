import { useContext } from "react"
import { PostsContext } from "@/contexts/posts-context-provider"

export function usePostsContext() {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error("useContext must be used within a PostsContextProvider")
  }

  return context
}
