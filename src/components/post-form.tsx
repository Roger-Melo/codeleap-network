"use client"

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
  return <h2 className="text-lg sm:text-xl font-bold">"What’s on your mind?"</h2>
}

export function PostForm({ actionType, onFormSubmission }: PostFormProps) {
  const { selectedPost, selectedPostId, handleAddPost, handleEditPost } = usePostsContext()

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
              required
              id="title"
              name="title"
              type="text"
              placeholder="Hello world"
              defaultValue={actionType === "edit" ? selectedPost?.title : ""}
              autoFocus
              className="border-primary-darkest-gray"
            />
          </div>
          <div className="space-y-3">
            <Label className="font-normal" htmlFor="content">Content</Label>
            <Textarea
              required
              id="content"
              name="content"
              placeholder="Content here"
              defaultValue={actionType === "edit" ? selectedPost?.content : ""}
              className="border-primary-darkest-gray"
            />
          </div>
        </div>
        <PostFormFooter actionType={actionType} />
      </form>
    </>
  )
}
