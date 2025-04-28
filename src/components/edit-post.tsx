"use client"

import { type ComponentPropsWithoutRef, forwardRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { usePostsContext } from "@/lib/hooks"
import { type PostIdProp } from "@/lib/types"
import { PostForm } from "./post-form"

const EditIcon = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<"svg">>((props, ref) => (
  <svg {...props} ref={ref} className="w-5 h-5 sm:w-6 sm:h-6 fill-white hover:cursor-pointer hover:fill-white/80" viewBox="0 0 26 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.10094 18.2663L11.8385 18.2475L24.3614 6.3225C24.8528 5.85 25.1233 5.2225 25.1233 4.555C25.1233 3.8875 24.8528 3.26 24.3614 2.7875L22.2994 0.805C21.3165 -0.14 19.6016 -0.135 18.6265 0.80125L6.10094 12.7288V18.2663ZM20.461 2.5725L22.5269 4.55125L20.4506 6.52875L18.3886 4.5475L20.461 2.5725ZM8.70122 13.7713L16.5411 6.305L18.6031 8.2875L10.7645 15.7513L8.70122 15.7575V13.7713Z" />
    <path d="M3.50067 23.25H21.7026C23.1367 23.25 24.3029 22.1287 24.3029 20.75V9.91499L21.7026 12.415V20.75H7.6065C7.5727 20.75 7.5376 20.7625 7.50379 20.7625C7.46089 20.7625 7.41798 20.7512 7.37378 20.75H3.50067V3.24999H12.4027L15.003 0.749994H3.50067C2.06661 0.749994 0.900391 1.87124 0.900391 3.24999V20.75C0.900391 22.1287 2.06661 23.25 3.50067 23.25Z" />
  </svg>
))

EditIcon.displayName = "EditIcon"

export function EditPost({ postId }: PostIdProp) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { handleSelectPost, handleUnselectPost } = usePostsContext()

  function handleOpenChange(open: boolean) {
    setIsDialogOpen(open)
    if (!open) {
      handleUnselectPost()
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={() => handleSelectPost(postId)}>
        <EditIcon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[640px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
        </DialogHeader>
        <PostForm actionType="edit" onFormSubmission={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
