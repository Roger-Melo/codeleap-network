"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const [usernameFieldState, setUsernameFieldState] = useState("")

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsernameFieldState(e.target.value)

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-left">
        <Label className="font-normal" htmlFor="username">Please enter your username</Label>
        <Input
          value={usernameFieldState}
          onChange={handleUsernameChange}
          id="username"
          type="text"
          placeholder="John doe"
          autoFocus
          className="border-primary-darkest-gray"
        />
        <small>It should have between 2 and 20 characters</small>
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
