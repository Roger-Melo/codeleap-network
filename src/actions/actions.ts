"use server"

import { type Post } from "@/lib/types"
import { baseUrl } from "@/lib/utils"

export async function addPost(data: Omit<Post, "id" | "created_datetime">) {
  await fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  })
}
