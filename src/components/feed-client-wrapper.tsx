"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PostsContextProvider } from "@/contexts/posts-context-provider"
import { useUsernameContext } from "@/lib/hooks"

type ClientProtectionProps = {
  children: React.ReactNode
  data: import('@/lib/types').Post[]
}

export function FeedClientWrapper({ data, children }: ClientProtectionProps) {
  const router = useRouter()
  const { usernameState } = useUsernameContext()

  useEffect(() => {
    if (!usernameState) {
      router.replace("/")
    }
  }, [usernameState, router])

  // no conditional null return to avoid hydration mismatch
  return <PostsContextProvider data={data}>{children}</PostsContextProvider>
}
