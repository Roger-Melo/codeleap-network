import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center p-4">
      <section className="flex flex-col gap-4 bg-white border border-primary-gray rounded-2xl p-5 w-full sm:w-[500px] mx-auto">
        <h1 className="text-lg sm:text-xl font-bold">Welcome to CodeLeap network!</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-left">
            <Label className="font-normal" htmlFor="username">Please enter your username</Label>
            <Input required id="username" type="text" placeholder="John doe" autoFocus className="border-primary-darkest-gray" />
          </div>
          <Button type="submit" className="uppercase bg-primary-blue ml-auto hover:bg-primary-acqua">Enter</Button>
        </form>
      </section>
    </main>
  )
}
