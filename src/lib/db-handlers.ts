import { z } from "zod"
import { baseUrl } from "@/lib/utils"
import { type AddedPostToApi, postFormSchema, postSchema } from "@/lib/types"

const addedPostToApiSchema = postFormSchema.extend({ username: z.string() })

export async function addPostToDb (post: AddedPostToApi) {
  const failMessage = "Could not add post. Please, try again in a few minutes."
  try {
    const validatedPost = addedPostToApiSchema.safeParse(post)
    if (!validatedPost.success) {
      return { message: "Invalid post data." }
    }

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validatedPost.data)
    })

    if (!response.ok) {
      return { message: failMessage }
    }

    const createdPostOnDb: unknown = await response.json()
    const validatedCreatedPostOnDb = postSchema.safeParse(createdPostOnDb)
    if (!validatedCreatedPostOnDb.success) {
      return { message: "Post was not created on db" }
    }

    return { createdPostOnDb: validatedCreatedPostOnDb.data }
  } catch {
    return { message: failMessage }
  }
}

const postIdSchema = z.number()

export async function editPostOnDb (editedData: unknown, postId: unknown) {
  const failMessage = "Could not edit post. Please, try again in a few minutes."
  try {
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
      return { message: failMessage }
    }

    const editedPostOnDb: unknown = await response.json()
    const validatedEditedPostOnDb = postSchema.safeParse(editedPostOnDb)
    if (!validatedEditedPostOnDb.success) {
      return { message: "Post was not edited on db" }
    }

    return { editedPostOnDb: validatedEditedPostOnDb.data }
  } catch {
    return { message: failMessage }
  }
}
