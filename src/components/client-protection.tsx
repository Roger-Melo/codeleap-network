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
      router.replace("/")
    }
  }, [usernameState])

  return usernameState ? <>{children}</> : null
}
