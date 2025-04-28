"use server"

import { revalidatePath } from "next/cache"
import { type Post } from "@/lib/types"
import { baseUrl, delay } from "@/lib/utils"

type PostCreationToApi = Omit<Post, "id" | "created_datetime">

export async function addPost(formData: FormData) {
  const failMessage = { message: "Could not add post. Please, try again in a few minutes." }
  try {
    const post: PostCreationToApi = {
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

type PostEditionToApi = Pick<Post, "title" | "content">

export async function editPost(formData: FormData, selectedPostId: number) {
  const failMessage = { message: "Could not edit post. Please, try again in a few minutes." }
  try {
    const post: PostEditionToApi = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    }

    await delay(2000)
    const response = await fetch(`${baseUrl}${selectedPostId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post)
    })

    if (!response.ok) {
      return failMessage
    }
  } catch (error) {
    return failMessage
  }

  revalidatePath("/feed", "layout")
}
