"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PostsContextProvider } from "@/contexts/posts-context-provider"
import { useUsernameContext } from "@/lib/hooks"
import { Post } from "@/lib/types"
import { baseUrl } from "@/lib/utils"
import { postsDataSchema } from "@/lib/types"

type ClientProtectionProps = { children: React.ReactNode }

export function FeedClientWrapper ({ children }: ClientProtectionProps) {
  const router = useRouter()
  const { usernameState } = useUsernameContext()
  const [hasMounted, setHasMounted] = useState(false)
  const [posts, setPosts] = useState<Post[] | null>(null)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted && !usernameState) {
      router.replace("/")
    }
  }, [hasMounted, usernameState, router])

  useEffect(() => {
    async function loadPosts () {
      const response = await fetch(baseUrl)
      const data: unknown = await response.json()
      const validatedData = postsDataSchema.safeParse(data)
      setPosts(validatedData.success ? validatedData.data.results : [])
    }
    loadPosts()
  }, [])

  if (posts === null) {
    return <p className="text-center">Loading posts...</p>
  }

  // no conditional null return to avoid hydration mismatch
  return <PostsContextProvider data={posts}>{children}</PostsContextProvider>
}
