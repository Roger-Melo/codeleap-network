import { z } from "zod"
import { baseUrl } from "@/lib/utils"
import { postFormSchema, postSchema } from "@/lib/types"
import { type Post } from "@/lib/types"

export async function addPostToDb(e: React.FormEvent<HTMLFormElement>, addPostToState: (newPost: Post) => void) {
  const failMessage = "Could not add post. Please, try again in a few minutes."
  try {
    const { title, content, username } = Object.fromEntries(new FormData(e.currentTarget))
    const addedPostToApiSchema = postFormSchema.extend({ username: z.string() })
    const validatedNewPost = addedPostToApiSchema.safeParse({ title, content, username })

    if (!validatedNewPost.success) {
      return alert("Invalid post data.")
    }

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validatedNewPost.data)
    })

    if (!response.ok) {
      return alert(failMessage)
    }

    const createdPostOnDb: unknown = await response.json()
    const validatedCreatedPostOnDb = postSchema.safeParse(createdPostOnDb)
    if (!validatedCreatedPostOnDb.success) {
      return alert("Post was not created on db")
    }

    addPostToState(validatedCreatedPostOnDb.data)
  } catch {
    alert(failMessage)
  }
}

const usernameSchema = z.string()

export async function setUsernameAction(username: unknown) {
  try {
    const validatedUsername = usernameSchema.safeParse(username)
    if (!validatedUsername.success) {
      return { error: true, errorMessage: "Invalid username." }
    }

    return { username: validatedUsername.data }
  } catch {
    return {
      error: true,
      errorMessage: "Could not set username. Please, try again in a few minutes."
    }
  }
}

// rename this file
// move this file
/*
"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { postFormSchema } from "@/lib/types"
import { baseUrl, delay } from "@/lib/utils"

const addedPostToApiSchema = postFormSchema.extend({ username: z.string() })

export async function addPostAction(newPost: unknown) {
  const failMessage = { message: "Could not add post. Please, try again in a few minutes." }
  try {
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
    console.log("response:", response)
    console.log("data:", data)
    // at the time of this writing, a post object that wasn't created on db don't have these properties
    const postWasNotReallyCreatedOnDb = !data.id || !data.created_datetime
    if (postWasNotReallyCreatedOnDb) {
      console.log("postWasNotReallyCreatedOnDb:", postWasNotReallyCreatedOnDb)
      return failMessage
    }
  } catch {
    return failMessage
  }

  revalidatePath("/feed", "layout")
}

const postIdSchema = z.number()

export async function editPostAction(editedData: unknown, postId: unknown) {
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

export async function deletePostAction(postId: unknown) {
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
*/
