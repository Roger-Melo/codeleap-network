"use client"

import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePostsContext } from "@/lib/hooks"
import { DialogClose } from "@/components/ui/dialog"

type PostFormProps = {
  actionType: "add" | "edit"
  onFormSubmission: () => void
}

export const PostForm = forwardRef<HTMLFormElement, PostFormProps>(
  function PostForm({ actionType, onFormSubmission }, formRef) {
    const { handleAddPost, handleEditPost, selectedPost } = usePostsContext()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const post = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
      }

      if (actionType === "add") {
        await handleAddPost(post)
      } else if (actionType === "edit") {
        handleEditPost(selectedPost!.id, post)
      }

      onFormSubmission()
    }

    return (
      <>
        {actionType === "add" && (
          <h2 className="text-lg sm:text-xl font-bold">"What’s on your mind?"</h2>
        )}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
          {actionType === "add"
            ? (
              <div className="flex">
                <Button type="submit" className="bg-primary-blue ml-auto hover:bg-primary-acqua">
                  Create
                </Button>
              </div>
            )
            : (
              <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row sm:justify-end">
                <Button
                  type="submit"
                  className="bg-primary-green hover:bg-primary-green/90 sm:order-2"
                >
                  Save changes
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="border border-primary-darkest-gray hover:bg-gray-200 sm:order-1"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            )
          }
        </form>
      </>
    )
  })
