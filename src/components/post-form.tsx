"use client"

import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PostFormFooter } from "./post-form-footer"
import { usePostsContext } from "@/lib/hooks"
import { type ActionTypes, type Post } from "@/lib/types"

type PostFormProps = {
  actionType: ActionTypes
  onFormSubmission?: () => void
}

function PostFormHeading() {
  return <h2 className="text-lg sm:text-xl font-bold">What’s on your mind?</h2>
}

type PostFormType = {
  title: string
  content: string
}

export function PostForm({ actionType, onFormSubmission }: PostFormProps) {
  const { selectedPost, selectedPostId, handleAddPost, handleEditPost } = usePostsContext()
  const { register, formState: { errors } } = useForm<PostFormType>()

  async function handleFormSubmittion(formData: FormData) {
    const post = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    }

    if (actionType === "edit" && onFormSubmission) {
      onFormSubmission()
      await handleEditPost(post, selectedPostId as Post["id"])
      return
    }

    const newPost = { ...post, username: "ABC123" }
    await handleAddPost(newPost)
  }

  return (
    <>
      {actionType === "add" && <PostFormHeading />}
      <form action={handleFormSubmittion} className="space-y-4">
        <div className="space-y-5">
          <div className="space-y-3">
            <Label className="font-normal" htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title")}
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
              {...register("content")}
              placeholder="Content here"
              className="border-primary-darkest-gray"
            />
            {errors.content && <p className="text-primary-red">{errors.content.message}</p>}
          </div>
        </div>
        <PostFormFooter actionType={actionType} />
      </form>
    </>
  )
}
