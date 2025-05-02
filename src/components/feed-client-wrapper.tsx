"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PostsContextProvider } from "@/contexts/posts-context-provider"
import { useUsernameContext } from "@/lib/hooks"
import { Post } from "@/lib/types"

type ClientProtectionProps = {
  children: React.ReactNode
  data: Post[]
}

export function FeedClientWrapper({ data, children }: ClientProtectionProps) {
  const router = useRouter()
  const { usernameState } = useUsernameContext()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted && !usernameState) {
      router.replace("/")
    }
  }, [hasMounted, usernameState, router])

  // no conditional null return to avoid hydration mismatch
  return <PostsContextProvider data={data}>{children}</PostsContextProvider>
}
