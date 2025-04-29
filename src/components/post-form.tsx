"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PostFormFooter } from "./post-form-footer"
import { usePostsContext } from "@/lib/hooks"
import { addPost, editPost } from "@/actions/actions"
import { type ActionTypes } from "@/lib/types"

type PostFormProps = {
  actionType: ActionTypes
  onFormSubmission?: () => void
}

function PostFormHeading() {
  return <h2 className="text-lg sm:text-xl font-bold">"What’s on your mind?"</h2>
}

function alertIfError(error: { message: string } | undefined) {
  if (error) {
    alert(error.message)
  }
}

export function PostForm({ actionType, onFormSubmission }: PostFormProps) {
  const { selectedPost, selectedPostId } = usePostsContext()

  async function handleFormSubmittion(formData: FormData) {
    if (actionType === "edit" && onFormSubmission) {
      const error = await editPost(formData, selectedPostId as number)
      onFormSubmission()
      alertIfError(error)
      return
    }

    const error = await addPost(formData)
    alertIfError(error)
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
