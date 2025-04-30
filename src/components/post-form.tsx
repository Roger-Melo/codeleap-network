"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
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

const postSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  content: z.string().trim().min(1, { message: "Content is required" }),
})

type PostFormType = z.infer<typeof postSchema>

function PostFormHeading() {
  return <h2 className="text-lg sm:text-xl font-bold">What’s on your mind?</h2>
}

export function PostForm({ actionType, onFormSubmission }: PostFormProps) {
  const { selectedPost, selectedPostId, handleAddPost, handleEditPost } = usePostsContext()
  const { register, trigger, setValue, formState: { errors } } = useForm<PostFormType>({
    resolver: zodResolver(postSchema)
  })
  const [formDataState, setFormDataState] = useState<PostFormType>({ title: "", content: "" })

  useEffect(() => {
    setValue("title", formDataState.title)
    setValue("content", formDataState.content)
  }, [formDataState, setValue])

  async function handleFormSubmittion(formData: FormData) {
    const result = await trigger()
    const title = formData.get("title") as string
    const content = formData.get("content") as string

    setFormDataState({ title, content })

    if (!result) {
      return
    }

    const post = { title, content }
    if (actionType === "edit" && onFormSubmission) {
      onFormSubmission()
      await handleEditPost(post, selectedPostId as Post["id"])
      return
    }

    const newPost = { ...post, username: "ABC123" }
    await handleAddPost(newPost)
    setFormDataState({ title: "", content: "" })
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
              {...register("title", { required: "Title is required", onChange: handleTitleChange })}
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
              {...register("content", { required: "Content is required", onChange: handleContentChange })}
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
