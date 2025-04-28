"use server"

import { type Post } from "@/lib/types"
import { baseUrl } from "@/lib/utils"

export async function addPost(data: Omit<Post, "id" | "created_datetime">) {
  await fetch(baseUrl, {
    method: 'POST',
    // body: {data},
  })
  console.log("addPost executed")
  console.log("data:", data)
}
