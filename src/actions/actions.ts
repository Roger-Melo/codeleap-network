"use server"

import { revalidatePath } from "next/cache"
import { type Post } from "@/lib/types"
import { baseUrl, delay } from "@/lib/utils"

type PostToApi = Omit<Post, "id" | "created_datetime">

export async function addPost(formData: FormData) {
  const failMessage = { message: "Could not add post. Please, try again in a few minutes." }
  try {
    const post: PostToApi = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      username: "ABC123",
    }

    await delay(2000)
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post)
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
  } catch (error) {
    return failMessage
  }

  revalidatePath("/feed", "layout")
}
