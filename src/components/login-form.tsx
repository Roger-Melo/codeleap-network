import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-left">
        <Label className="font-normal" htmlFor="username">Please enter your username</Label>
        <Input
          required
          id="username"
          type="text"
          placeholder="John doe"
          autoFocus
          className="border-primary-darkest-gray"
        />
      </div>
      <Button type="submit" className="uppercase bg-primary-blue ml-auto hover:bg-primary-acqua">
        Enter
      </Button>
    </form>
  )
}
