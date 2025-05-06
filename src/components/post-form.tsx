"use client"

import { z } from "zod"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PostFormFooter } from "./post-form-footer"
import { usePostsContext, useUsernameContext } from "@/lib/hooks"
import { baseUrl } from "@/lib/utils"
import { type ActionTypes, type PostFormType, postFormSchema, postSchema } from "@/lib/types"
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
// const { selectedPost, selectedPostId, handleEditPost } = usePostsContext()
// const { register, trigger, setValue, getValues, formState: { errors } } = useForm<PostFormType>({

export function PostForm({ actionType }: PostFormProps) {
  const { selectedPost, addPostToState } = usePostsContext()
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
    const failMessage = "Could not add post. Please, try again in a few minutes."
    try {
      const { title, content, username } = Object.fromEntries(new FormData(e.currentTarget))
      const addedPostToApiSchema = postFormSchema.extend({ username: z.string() })
      const validatedNewPost = addedPostToApiSchema.safeParse({ title, content, username })

      if (!validatedNewPost.success) {
        return alert("Invalid post data.")
      }

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(validatedNewPost.data)
      })

      if (!response.ok) {
        return alert(failMessage)
      }

      const createdPostOnDb: unknown = await response.json()
      const validatedCreatedPostOnDb = postSchema.safeParse(createdPostOnDb)
      if (!validatedCreatedPostOnDb.success) {
        return alert("Post was not created on db")
      }

      addPostToState(validatedCreatedPostOnDb.data)
      setFormDataState(emptyFormDataState)
    } catch {
      alert(failMessage)
    }

    // createPostServerAction(newPost)
    // const result = await trigger()
    // const post = getValues()
    // setFormDataState(post)

    // if (!result) {
    //   return
    // }

    // if (actionType === "edit" && onFormSubmission) {
    //   onFormSubmission()
    //   await handleEditPost(post, selectedPostId as Post["id"])
    // } else if (actionType === "add") {
    //   const newPost = { ...post, username: usernameState }
    //   console.log("newPost:", newPost)
    //   await handleAddPost(newPost)
    // }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormDataState((prev) => ({ ...prev, title: e.target.value }))

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFormDataState((prev) => ({ ...prev, content: e.target.value }))

  return (
    <>
      {actionType === "add" && <PostFormHeading />}
      {/* <form action={createPostServerAction} className="space-y-4"> */}
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
