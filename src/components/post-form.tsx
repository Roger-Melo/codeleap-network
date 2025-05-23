"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PostFormFooter } from "./post-form-footer"
import { usePostsContext, useUsernameContext } from "@/lib/hooks"
import { type ActionTypes, type PostFormType, type Post } from "@/lib/types"
import { addPostToDb, editPostOnDb } from "@/lib/db-handlers"

type PostFormProps = {
  actionType: ActionTypes
  closeDialog?: () => void
}

function PostFormHeading() {
  return <h2 className="text-lg sm:text-xl font-bold">What’s on your mind?</h2>
}

const emptyFormDataState = { title: "", content: "" }

export function PostForm({ actionType, closeDialog }: PostFormProps) {
  const { editPostOnState, addPostToState, selectedPost, selectedPostId } = usePostsContext()
  const { usernameState } = useUsernameContext()
  const [formDataState, setFormDataState] = useState<PostFormType>(
    actionType === "edit" && selectedPost
      ? { title: selectedPost.title, content: selectedPost.content }
      : emptyFormDataState
  )

  async function handleFormSubmittion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const post = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      username: formData.get("username") as string,
    }

    if (actionType === "add") {
      const { createdPostOnDb, message } = await addPostToDb(post)
      if (!createdPostOnDb) {
        return alert(message)
      }
      addPostToState(createdPostOnDb)
      setFormDataState(emptyFormDataState)
    } else if (actionType === "edit" && closeDialog) {
      const editedData = { title: post.title, content: post.content }
      const { editedPostOnDb, message } = await editPostOnDb(editedData, selectedPostId)
      if (!editedPostOnDb) {
        return alert(message)
      }
      editPostOnState(editedData, selectedPostId as Post["id"])
      closeDialog()
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormDataState((prev) => ({ ...prev, title: e.target.value }))

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFormDataState((prev) => ({ ...prev, content: e.target.value }))

  return (
    <>
      {actionType === "add" && <PostFormHeading />}
      <form onSubmit={handleFormSubmittion} className="space-y-4">
        <div className="space-y-5">
          <div className="space-y-3">
            <Label className="font-normal" htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formDataState.title}
              onChange={handleTitleChange}
              name="title"
              placeholder="Hello world"
              autoFocus
              className="border-primary-darkest-gray"
            />
          </div>
          <div className="space-y-3">
            <Label className="font-normal" htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formDataState.content}
              onChange={handleContentChange}
              name="content"
              placeholder="Content here"
              className="border-primary-darkest-gray"
            />
            <input type="hidden" name="username" value={usernameState} />
          </div>
        </div>
        <PostFormFooter actionType={actionType} formDataState={formDataState} />
      </form>
    </>
  )
}
