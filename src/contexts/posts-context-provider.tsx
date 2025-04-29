"use client"

import { createContext, useOptimistic, useState } from "react"
import { type Post, type EditedPostToApi, type AddedPostToApi } from "@/lib/types"
import { addPost, editPost, deletePost } from "@/actions/actions"
import { generateTempTimestamp } from "@/lib/utils"

type PostsContextType = {
  posts: Post[]
  selectedPostId: number | null
  selectedPost: Post | undefined
  handleSelectPost: (id: number) => void
  handleUnselectPost: () => void
  handleDeletePost: (id: number) => Promise<void>
  handleEditPost: (editedData: EditedPostToApi, selectedPostId: number) => Promise<void>
  handleAddPost: (newPost: AddedPostToApi) => Promise<void>
}

type PostsContextProviderProps = {
  children: React.ReactNode
  data: Post[]
}

export const PostsContext = createContext<PostsContextType | null>(null)

export function PostsContextProvider({ data, children }: PostsContextProviderProps) {
  const [optimisticPosts, setOptimisticPosts] = useOptimistic(data, (state, { action, payload }) => {
    if (action === "add") {
      const tempPostToOptimisticUi = {
        ...payload,
        id: Math.random(),
        created_datetime: generateTempTimestamp()
      }
      return [tempPostToOptimisticUi, ...state]
    }

    if (action === "edit") {
      return state.map((post) =>
        post.id === payload.selectedPostId ? { ...post, ...payload.editedData } : post)
    }

    if (action === "delete") {
      return state.filter((post) => post.id !== payload.id)
    }

    return state
  })
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  const selectedPost = optimisticPosts.find((post) => post.id === selectedPostId)

  function handleSelectPost(id: number) {
    setSelectedPostId(id)
  }

  function handleUnselectPost() {
    setSelectedPostId(null)
  }

  async function handleAddPost(newPost: AddedPostToApi) {
    setOptimisticPosts({ action: "add", payload: newPost })
    const error = await addPost(newPost)
    if (error) {
      alert(error.message)
    }
  }

  async function handleDeletePost(id: number) {
    setOptimisticPosts({ action: "delete", payload: { id } })
    await deletePost(id)
    setSelectedPostId(null)
  }

  async function handleEditPost(editedData: EditedPostToApi, selectedPostId: number) {
    setOptimisticPosts({ action: "edit", payload: { editedData, selectedPostId } })
    const error = await editPost(editedData, selectedPostId)
    if (error) {
      alert(error.message)
    }
  }

  return (
    <PostsContext.Provider value={{
      posts: optimisticPosts,
      selectedPostId,
      selectedPost,
      handleSelectPost,
      handleUnselectPost,
      handleDeletePost,
      handleEditPost,
      handleAddPost
    }}>
      {children}
    </PostsContext.Provider>
  )
}
