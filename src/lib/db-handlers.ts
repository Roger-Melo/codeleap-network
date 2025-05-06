import { z } from "zod"
import { baseUrl } from "@/lib/utils"
import { type AddedPostToApi, postFormSchema, postSchema } from "@/lib/types"

export async function addPostToDb(post: AddedPostToApi) {
  const failMessage = "Could not add post. Please, try again in a few minutes."
  try {
    const addedPostToApiSchema = postFormSchema.extend({ username: z.string() })
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
