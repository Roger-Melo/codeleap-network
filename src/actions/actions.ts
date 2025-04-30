"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { postFormSchema } from "@/lib/types"
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

const postIdSchema = z.number()

export async function editPost(editedData: unknown, postId: unknown) {
  const failMessage = { message: "Could not edit post. Please, try again in a few minutes." }
  try {
    await delay(1000)
    const validatedEditedData = postFormSchema.safeParse(editedData)
    const validatedPostId = postIdSchema.safeParse(postId)
    if (!validatedEditedData.success || !validatedPostId.success) {
      return { message: "Invalid edited post data." }
    }

    const response = await fetch(`${baseUrl}${validatedPostId.data}/`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validatedEditedData.data)
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
    const validatedPostId = postIdSchema.safeParse(postId)
    if (!validatedPostId.success) {
      return { message: "Invalid post id." }
    }

    const response = await fetch(`${baseUrl}${validatedPostId.data}/`, {
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
