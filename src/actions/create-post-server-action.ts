"use server"

import { addPostAction } from "./actions"
import { redirect } from "next/navigation"

export async function createPostServerAction(formData: FormData) {
  const title = formData.get("title")?.toString() || ""
  const content = formData.get("content")?.toString() || ""
  const username = formData.get("username")?.toString() || ""

  const error = await addPostAction({ title, content, username })
  if (error) {
    console.error("Failed to create post:", error)
    return
  }

  redirect("/feed")
}
