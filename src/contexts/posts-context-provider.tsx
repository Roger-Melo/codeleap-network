"use client"

import { createContext, useOptimistic, useState, startTransition } from "react"
import { type Post, type EditedPostToApi, type AddedPostToApi } from "@/lib/types"
import { addPostAction, editPostAction, deletePostAction } from "@/actions/actions"
import { generateTempTimestamp, alertIfError } from "@/lib/utils"

type PostsContextType = {
  posts: Post[]
  selectedPostId: Post["id"] | null
  selectedPost: Post | undefined
  handleSelectPost: (id: Post["id"]) => void
  handleUnselectPost: () => void
  handleDeletePost: (id: Post["id"]) => Promise<void>
  handleEditPost: (editedData: EditedPostToApi, selectedPostId: Post["id"]) => Promise<void>
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
  const [selectedPostId, setSelectedPostId] = useState<Post["id"] | null>(null)

  const selectedPost = optimisticPosts.find((post) => post.id === selectedPostId)

  function handleSelectPost(id: Post["id"]) {
    setSelectedPostId(id)
  }

  function handleUnselectPost() {
    setSelectedPostId(null)
  }

  async function handleAddPost(newPost: AddedPostToApi) {
    setOptimisticPosts({ action: "add", payload: newPost })
    const error = await addPostAction(newPost)
    alertIfError(error)
  }

  async function handleDeletePost(id: Post["id"]) {
    // startTransition because there's no form action to delete a post
    startTransition(() => setOptimisticPosts({ action: "delete", payload: { id } }))
    const error = await deletePostAction(id)
    alertIfError(error)
    setSelectedPostId(null)
  }

  async function handleEditPost(editedData: EditedPostToApi, selectedPostId: Post["id"]) {
    setOptimisticPosts({ action: "edit", payload: { editedData, selectedPostId } })
    const error = await editPostAction(editedData, selectedPostId)
    alertIfError(error)
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
