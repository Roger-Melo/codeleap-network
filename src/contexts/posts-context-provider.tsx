"use client"

import { createContext, useState } from "react"
import { addPost } from "@/actions/actions"
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

  async function handleAddPost(newPost: PostFromForm) {
    await addPost({ username: "ABC123", title: newPost.title, content: newPost.content })
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
