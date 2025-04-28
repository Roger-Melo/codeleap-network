"use server"

import { revalidatePath } from "next/cache"
import { type Post } from "@/lib/types"
import { baseUrl } from "@/lib/utils"

type PostToApi = Omit<Post, "id" | "created_datetime">

export async function addPost(formData: FormData) {
  const post: PostToApi = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    username: "ABC123",
  }

  await fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post)
  })

  revalidatePath("/feed", "layout")
}
