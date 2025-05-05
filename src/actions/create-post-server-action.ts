"use server"

import { addPostAction } from "./actions"
import { redirect } from "next/navigation"

export async function createPostServerAction(formData: FormData) {
  const { title, content, username } = Object.fromEntries(formData)
  const error = await addPostAction({ title, content, username })
  if (error) {
    console.error("Failed to create post:", error)
    return
  }

  redirect("/feed")
}
