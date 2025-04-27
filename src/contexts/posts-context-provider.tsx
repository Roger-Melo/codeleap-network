"use client"

import { createContext, useState } from "react"
import { type Post } from "@/lib/types"

type PostsContextType = {
  posts: Post[]
  selectedPostId: number | null
  handleSelectPost: (id: number) => void
  handleUnselectPost: () => void
  handleDeletePost: (id: number) => void
}

type PostsContextProviderProps = {
  children: React.ReactNode
  data: Post[]
}

export const PostsContext = createContext<PostsContextType | null>(null)

export function PostsContextProvider({ data, children }: PostsContextProviderProps) {
  const [posts, setPosts] = useState(data)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  function handleSelectPost(id: number) {
    setSelectedPostId(id)
  }

  function handleUnselectPost() {
    setSelectedPostId(null)
  }

  function handleDeletePost(id: number) {
    setPosts((prev) => prev.filter((post) => post.id !== id))
  }

  return (
    <PostsContext.Provider value={{ posts, selectedPostId, handleSelectPost, handleUnselectPost, handleDeletePost }}>
      {children}
    </PostsContext.Provider>
  )
}
