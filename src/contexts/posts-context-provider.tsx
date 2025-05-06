"use client"

import { createContext, useState } from "react"
import { type Post } from "@/lib/types"
// import { editPostAction } from "@/actions/actions"

type PostsContextType = {
  posts: Post[]
  selectedPostId: Post["id"] | null
  selectedPost: Post | undefined
  handleSelectPost: (id: Post["id"]) => void
  handleUnselectPost: () => void
  deletePostFromState: (id: Post["id"]) => void
  // handleEditPost: (editedData: EditedPostToApi, selectedPostId: Post["id"]) => Promise<void>
  addPostToState: (newPost: Post) => void
}

type PostsContextProviderProps = {
  children: React.ReactNode
  data: Post[]
}

export const PostsContext = createContext<PostsContextType | null>(null)

export function PostsContextProvider({ data, children }: PostsContextProviderProps) {
  const [posts, setPosts] = useState(data)
  // const [optimisticPosts, setOptimisticPosts] = useOptimistic(data, (state, { action, payload }) => {
  //   if (action === "add") {
  //     const tempPostToOptimisticUi = {
  //       ...payload,
  //       id: Math.random(),
  //       // temporary. only to user sees when it's created with optimistic UI
  //       created_datetime: new Date().toISOString()
  //     }
  //     return [tempPostToOptimisticUi, ...state]
  //   }

  //   if (action === "edit") {
  //     return state.map((post) =>
  //       post.id === payload.selectedPostId ? { ...post, ...payload.editedData } : post)
  //   }

  //   if (action === "delete") {
  //     return state.filter((post) => post.id !== payload.id)
  //   }

  //   return state
  // })
  const [selectedPostId, setSelectedPostId] = useState<Post["id"] | null>(null)

  const selectedPost = posts.find((post) => post.id === selectedPostId)

  function handleSelectPost(id: Post["id"]) {
    setSelectedPostId(id)
  }

  function handleUnselectPost() {
    setSelectedPostId(null)
  }

  async function addPostToState(newPost: Post) {
    setPosts((prev) => [newPost, ...prev])
  }

  async function deletePostFromState(id: Post["id"]) {
    setPosts((prev) => prev.filter((post) => post.id !== id))
  }

  // async function handleEditPost(editedData: EditedPostToApi, selectedPostId: Post["id"]) {
  // setOptimisticPosts({ action: "edit", payload: { editedData, selectedPostId } })
  // const error = await editPostAction(editedData, selectedPostId)
  // alertIfError(error)
  // }

  return (
    <PostsContext.Provider value={{
      posts,
      selectedPostId,
      selectedPost,
      handleSelectPost,
      handleUnselectPost,
      deletePostFromState,
      // handleEditPost,
      addPostToState
    }}>
      {children}
    </PostsContext.Provider>
  )
}
