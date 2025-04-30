"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { type EditedPostToApi, type AddedPostToApi, type Post, postFormSchema } from "@/lib/types"
import { baseUrl, delay } from "@/lib/utils"

const addedPostToApiSchema = postFormSchema.extend({ username: z.string() })

export async function addPost(newPost: unknown) {
  const failMessage = { message: "Could not add post. Please, try again in a few minutes." }
  try {
    await delay(1000)
    const validatedNewPost = addedPostToApiSchema.safeParse(newPost)
    if (!validatedNewPost.success) {
      return { message: "Invalid post data." }
    }

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validatedNewPost.data)
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
}

export async function editPost(editedData: unknown, selectedPostId: unknown) {
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

export async function deletePost(postId: unknown) {
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
