import { z } from "zod"

export const postSchema = z.object({
  id: z.number(),
  username: z.string(),
  created_datetime: z.string().datetime(),
  title: z.string(),
  content: z.string(),
})

export const postFormSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  content: z.string().trim().min(1, { message: "Content is required" }),
})

export const postsDataSchema = z.object({ results: z.array(postSchema) })

export type Post = z.infer<typeof postSchema>
export type PostFormType = z.infer<typeof postFormSchema>
export type EditedPostToApi = Pick<Post, "title" | "content">
export type AddedPostToApi = Omit<Post, "id" | "created_datetime">
export type PostIdProp = { postId: Post["id"] }
export type ActionTypes = "add" | "edit"
