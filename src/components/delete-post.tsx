"use client"

import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { usePostsContext } from "@/lib/hooks"
import { type PostIdProp } from "@/lib/types"

const DeleteIcon = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<"svg">>((props, ref) => (
  <svg {...props} ref={ref} className="w-4 h-5 sm:w-5 sm:h-6 fill-white hover:cursor-pointer hover:fill-white/80" viewBox="0 0 19 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.80087 20.75C1.80087 22.125 2.971 23.25 4.40115 23.25H14.8023C16.2324 23.25 17.4025 22.125 17.4025 20.75V5.75H1.80087V20.75ZM4.99921 11.85L6.83241 10.0875L9.6017 12.7375L12.358 10.0875L14.1912 11.85L11.4349 14.5L14.1912 17.15L12.358 18.9125L9.6017 16.2625L6.84541 18.9125L5.01221 17.15L7.76851 14.5L4.99921 11.85ZM14.1522 2L12.852 0.75H6.35136L5.05122 2H0.500732V4.5H18.7027V2H14.1522Z" />
  </svg>
))

DeleteIcon.displayName = "DeleteIcon"

export function DeletePost({ postId }: PostIdProp) {
  const { handleSelectPost, handleUnselectPost } = usePostsContext()
  return (
    <AlertDialog onOpenChange={(open) => !open && handleUnselectPost()}>
      <AlertDialogTrigger asChild onClick={() => handleSelectPost(postId)}>
        <DeleteIcon />
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[600px] md:max-w-[640px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="py-5 hover:cursor-pointer border-primary-dark-gray sm:w-32">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-primary-red py-5 hover:cursor-pointer hover:bg-primary-red/90 sm:w-32">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
