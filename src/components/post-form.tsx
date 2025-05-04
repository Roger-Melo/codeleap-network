"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PostFormFooter } from "./post-form-footer"
import { usePostsContext, useUsernameContext } from "@/lib/hooks"
import { type ActionTypes, type Post, type PostFormType, postFormSchema } from "@/lib/types"

type PostFormProps = {
  actionType: ActionTypes
  onFormSubmission?: () => void
}

function PostFormHeading() {
  return <h2 className="text-lg sm:text-xl font-bold">What’s on your mind?</h2>
}

const emptyFormDataState = { title: "", content: "" }

export function PostForm({ actionType, onFormSubmission }: PostFormProps) {
  const { selectedPost, selectedPostId, handleAddPost, handleEditPost } = usePostsContext()
  const { usernameState } = useUsernameContext()
  const { register, trigger, setValue, getValues, formState: { errors } } = useForm<PostFormType>({
    resolver: zodResolver(postFormSchema)
  })
  // useState is necessary because React completely resets the form fields after an action submission if FE validation (disabled) is removed from PostFormFooter buttons
  const [formDataState, setFormDataState] = useState<PostFormType>(
    actionType === "edit" && selectedPost
      ? { title: selectedPost.title, content: selectedPost.content }
      : emptyFormDataState
  )

  useEffect(() => {
    setValue("title", formDataState.title)
    setValue("content", formDataState.content)
  }, [formDataState, setValue])

  async function handleFormSubmittion() {
    const result = await trigger()
    const post = getValues()
    setFormDataState(post)

    if (!result) {
      return
    }

    if (actionType === "edit" && onFormSubmission) {
      onFormSubmission()
      await handleEditPost(post, selectedPostId as Post["id"])
    } else if (actionType === "add") {
      const newPost = { ...post, username: usernameState }
      console.log("newPost:", newPost)
      await handleAddPost(newPost)
    }

    setFormDataState(emptyFormDataState)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormDataState((prev) => ({ ...prev, title: e.target.value }))

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFormDataState((prev) => ({ ...prev, content: e.target.value }))

  return (
    <>
      {actionType === "add" && <PostFormHeading />}
      <form action={handleFormSubmittion} className="space-y-4">
        <div className="space-y-5">
          <div className="space-y-3">
            <Label className="font-normal" htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formDataState.title}
              {...register("title", { onChange: handleTitleChange })}
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
              placeholder="Content here"
              className="border-primary-darkest-gray"
            />
            {errors.content && <p className="text-primary-red">{errors.content.message}</p>}
          </div>
        </div>
        <PostFormFooter actionType={actionType} formDataState={formDataState} />
      </form>
    </>
  )
}
