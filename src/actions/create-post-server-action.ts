"use server"

import { addPostAction } from "./actions"
import { redirect } from "next/navigation"

export async function createPostServerAction(newPost: unknown) {
  const error = await addPostAction(newPost)
  if (error) {
    console.error("Failed to create post:", error)
    return
  }

  redirect("/feed")
}
