"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUsernameContext } from "@/lib/hooks"

type ClientProtectionProps = { children: React.ReactNode }

export function ClientProtection({ children }: ClientProtectionProps) {
  const router = useRouter()
  const { usernameState } = useUsernameContext()

  useEffect(() => {
    if (!usernameState) {
      console.log("[ClientProtection] No username, redirecting to /")
      router.replace("/")
    } else {
      console.log("[ClientProtection] Access granted:", usernameState)
    }
  }, [usernameState])

  return usernameState ? <>{children}</> : null
}
