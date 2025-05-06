"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PostFormFooter } from "./post-form-footer"
import { usePostsContext, useUsernameContext } from "@/lib/hooks"
import { type ActionTypes, type PostFormType, postFormSchema } from "@/lib/types"
import { addPostToDb } from "@/actions/actions"
// import { type ActionTypes, type Post, type PostFormType, postFormSchema } from "@/lib/types"
// import { createPostServerAction } from "@/actions/create-post-server-action"

type PostFormProps = {
  actionType: ActionTypes
  onFormSubmission?: () => void
}

function PostFormHeading() {
  return <h2 className="text-lg sm:text-xl font-bold">What’s on your mind?</h2>
}

const emptyFormDataState = { title: "", content: "" }

// export function PostForm({ actionType, onFormSubmission }: PostFormProps) {
// const { selectedPost, selectedPostId, editPostOnState } = usePostsContext()
// const { register, trigger, setValue, getValues, formState: { errors } } = useForm<PostFormType>({

export function PostForm({ actionType, onFormSubmission }: PostFormProps) {
  const { addPostToState, selectedPost } = usePostsContext()
  const { usernameState } = useUsernameContext()
  const { register, setValue, formState: { errors } } = useForm<PostFormType>({
    resolver: zodResolver(postFormSchema)
  })
  const [formDataState, setFormDataState] = useState<PostFormType>(
    actionType === "edit" && selectedPost
      ? { title: selectedPost.title, content: selectedPost.content }
      : emptyFormDataState
  )

  useEffect(() => {
    setValue("title", formDataState.title)
    setValue("content", formDataState.content)
  }, [formDataState, setValue])

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
    } else if (actionType === "edit" && onFormSubmission) {
      // await editPostOnDb()
      // editPostOnState(post, selectedPostId as Post["id"])
      // onFormSubmission()
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
              {...register("title", { onChange: handleTitleChange })}
              name="title"
              placeholder="Hello world"
              autoFocus
              className="border-primary-darkest-gray"
            />
            {errors.title && <p className="text-primary-red">{errors.title.message}</p>}
          </div>
          <div className="space-y-3">
            <Label className="font-normal" htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formDataState.content}
              {...register("content", { onChange: handleContentChange })}
              name="content"
              placeholder="Content here"
              className="border-primary-darkest-gray"
            />
            {errors.content && <p className="text-primary-red">{errors.content.message}</p>}
            <input type="hidden" name="username" value={usernameState} />
          </div>
        </div>
        <PostFormFooter actionType={actionType} formDataState={formDataState} />
      </form>
    </>
  )
}
