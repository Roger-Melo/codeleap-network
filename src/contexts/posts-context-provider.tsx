"use client"

import { createContext, useState } from "react"
import { type Post } from "@/lib/types"

type PostFromForm = Omit<Post, "id" | "created_datetime" | "username">

type PostsContextType = {
  posts: Post[]
  selectedPostId: number | null
  selectedPost: Post | undefined
  handleSelectPost: (id: number) => void
  handleUnselectPost: () => void
  handleDeletePost: (id: number) => void
  handleAddPost: (newPost: PostFromForm) => void
  handleEditPost: (postId: number, updatedPostData: PostFromForm) => void
}

type PostsContextProviderProps = {
  children: React.ReactNode
  data: Post[]
}

export const PostsContext = createContext<PostsContextType | null>(null)

function generateTimestamp() {
  const now = new Date()
  const iso = now.toISOString()
  const [date, time] = iso.split('T')
  const [hms, msAndZ] = time.split('.')
  const ms = msAndZ.slice(0, 3) // milliseconds part
  const extraMicroseconds = String(Math.floor(Math.random() * 1000)).padStart(3, '0') // fake microseconds
  return `${date}T${hms}.${ms}${extraMicroseconds}Z`
}

export function PostsContextProvider({ data, children }: PostsContextProviderProps) {
  const [posts, setPosts] = useState(data)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  const selectedPost = posts.find((post) => post.id === selectedPostId)

  function handleSelectPost(id: number) {
    setSelectedPostId(id)
  }

  function handleUnselectPost() {
    setSelectedPostId(null)
  }

  function handleDeletePost(id: number) {
    setPosts((prev) => prev.filter((post) => post.id !== id))
  }

  function handleAddPost(newPost: PostFromForm) {
    setPosts((prev) => [
      ...prev,
      { ...newPost, id: Math.random(), created_datetime: generateTimestamp(), username: "ABC123", }
    ])
  }

  function handleEditPost(postId: number, updatedPostData: PostFromForm) {
    setPosts((prev) => prev.map((post) => post.id === postId
      ? { ...post, title: updatedPostData.title, content: updatedPostData.content }
      : post
    ))
  }

  return (
    <PostsContext.Provider value={{
      posts,
      selectedPostId,
      selectedPost,
      handleAddPost,
      handleSelectPost,
      handleUnselectPost,
      handleDeletePost,
      handleEditPost
    }}>
      {children}
    </PostsContext.Provider>
  )
}
