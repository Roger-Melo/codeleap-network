"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUsernameContext } from "@/lib/hooks"
import { LoginForm } from "@/components/login-form"

export default function Home () {
  const { usernameState } = useUsernameContext()
  const router = useRouter()

  useEffect(() => {
    if (usernameState) {
      router.replace("/feed")
    }
  }, [usernameState, router])

  return (
    <main className="min-h-screen flex flex-col justify-center p-4">
      <section className="flex flex-col gap-4 bg-white border border-primary-gray rounded-2xl p-5 w-full sm:w-[500px] mx-auto">
        <h1 className="text-lg sm:text-xl font-bold">Welcome to CodeLeap network!</h1>
        <LoginForm />
      </section>
    </main>
  )
}
