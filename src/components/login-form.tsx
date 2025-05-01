"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { setUsernameAction } from "@/actions/actions"
import { useUsernameContext } from "@/lib/hooks"

export function LoginForm() {
  const router = useRouter()
  const { setUsername } = useUsernameContext()
  const [usernameFieldState, setUsernameFieldState] = useState("")

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsernameFieldState(e.target.value)

  async function handleFormSubmittion(formData: FormData) {
    const { error, errorMessage, username } = await setUsernameAction(formData.get("username"))
    if (error) {
      alert(errorMessage)
      return
    }

    setUsername(username ?? "Default username")
    router.push("/feed")
  }

  return (
    <form action={handleFormSubmittion} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-left">
        <Label className="font-normal" htmlFor="username">Please enter your username</Label>
        <Input
          value={usernameFieldState}
          onChange={handleUsernameChange}
          name="username"
          id="username"
          type="text"
          placeholder="John doe"
          autoFocus
          className="border-primary-darkest-gray"
        />
        {/* <small>It should have between 2 and 20 characters</small> */}
      </div>
      <Button
        disabled={usernameFieldState === ""}
        type="submit"
        className="uppercase bg-primary-blue ml-auto hover:bg-primary-acqua"
      >
        Enter
      </Button>
    </form>
  )
}
