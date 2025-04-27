"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePostsContext } from "@/lib/hooks"

type PostFormProps = { actionType: "add" | "edit" }

export function PostForm({ actionType }: PostFormProps) {
  const { handleAddPost } = usePostsContext()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newPost = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    }
    handleAddPost(newPost)
  }

  return (
    <>
      <h2 className="text-lg sm:text-xl font-bold">
        {actionType === "add" ? "What’s on your mind?" : "Edit post"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-5">
          <div className="space-y-3">
            <Label className="font-normal" htmlFor="title">Title</Label>
            <Input
              required
              id="title"
              name="title"
              type="text"
              placeholder="Hello world"
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
              className="border-primary-darkest-gray"
            />
          </div>
        </div>
        <div className="flex">
          {actionType === "add"
            ? (
              <Button type="submit" className="bg-primary-blue ml-auto hover:bg-primary-acqua">
                Create
              </Button>
            )
            : <h3 className="bg-red-600">RENDERIZAR BOTÕES DE EDIÇÃO</h3>
          }
        </div>
      </form>
    </>
  )
}
