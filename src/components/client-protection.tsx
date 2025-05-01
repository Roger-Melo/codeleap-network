"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUsernameContext } from "@/lib/hooks"

type ClientProtectionProps = { children: React.ReactNode }

export function ClientProtection({ children }: ClientProtectionProps) {
  const router = useRouter()
  const { usernameState } = useUsernameContext()
  const [mounted, setMounted] = useState(false)

  // track whether we've hydrated
  useEffect(() => {
    setMounted(true)
  }, [])

  // after mount, if no username, redirect
  useEffect(() => {
    if (mounted && !usernameState) {
      console.log("[ClientProtection] no username → redirect")
      router.replace("/")
    }
  }, [mounted, usernameState, router])

  // before mount, render exactly what server sent
  if (!mounted) {
    return <>{children}</>
  }

  // once mounted, only render children if we have a username
  if (!usernameState) {
    return null
  }

  return <>{children}</>
}
