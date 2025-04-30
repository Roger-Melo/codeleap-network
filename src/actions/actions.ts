"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { type EditedPostToApi, type AddedPostToApi, type Post } from "@/lib/types"
import { baseUrl, delay } from "@/lib/utils"

const addPostSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  content: z.string().trim().min(1, { message: "Content is required" }),
})

export async function addPost(newPost: AddedPostToApi) {
  console.log("executou action addPost:", newPost)
  const validatedNewPost = addPostSchema.safeParse(newPost)
  if (!validatedNewPost.success) {
    return { message: "Please, fill in all fields." }
  }
  /*
  const failMessage = { message: "Could not add post. Please, try again in a few minutes." }
  try {
    await delay(1000)
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newPost)
    })

    if (!response.ok) {
      return failMessage
    }

    const data = await response.json()
    // at the time of this writing, a post object that wasn't created on db don't have these properties
    const postWasNotReallyCreatedOnDb = !data.id || !data.created_datetime
    if (postWasNotReallyCreatedOnDb) {
      return failMessage
    }
  } catch {
    return failMessage
  }

  revalidatePath("/feed", "layout")
  */
}

export async function editPost(editedData: EditedPostToApi, selectedPostId: Post["id"]) {
  const failMessage = { message: "Could not edit post. Please, try again in a few minutes." }
  try {
    await delay(1000)
    const response = await fetch(`${baseUrl}${selectedPostId}/`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editedData)
    })

    if (!response.ok) {
      return failMessage
    }
  } catch {
    return failMessage
  }

  revalidatePath("/feed", "layout")
}

export async function deletePost(postId: Post["id"]) {
  const failMessage = { message: "Could not delete post. Please, try again in a few minutes." }
  try {
    await delay(1000)
    const response = await fetch(`${baseUrl}${postId}/`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({})
    })

    if (!response.ok) {
      return failMessage
    }
  } catch {
    return failMessage
  }

  revalidatePath("/feed", "layout")
}
