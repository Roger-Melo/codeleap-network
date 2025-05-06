import { z } from "zod"

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
