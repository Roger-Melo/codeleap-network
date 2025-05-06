import { z } from "zod"
import { baseUrl } from "@/lib/utils"
import { postFormSchema, postSchema } from "@/lib/types"

const postIdSchema = z.number()

export async function editPostOnDb(editedData: unknown, postId: unknown) {
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
