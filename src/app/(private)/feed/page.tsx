import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PostsList } from "@/components/posts-list"

function PostForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-left">
        <Label className="font-normal" htmlFor="title">Title</Label>
        <Input required id="title" type="text" placeholder="Hello world" autoFocus className="border-primary-darkest-gray" />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-normal" htmlFor="content">Content</Label>
        <Textarea required id="content" placeholder="Content here" className="border-primary-darkest-gray" />
      </div>
      <Button type="submit" className="bg-primary-blue ml-auto hover:bg-primary-acqua">Create</Button>
    </form>
  )
}

function Header() {
  return (
    <header className="bg-primary-blue py-8 px-6 border-b border-primary-dark-gray">
      <h1 className="text-xl sm:text-2xl font-bold text-white">CodeLeap Network</h1>
    </header>
  )
}

export default function FeedPage() {
  return (
    <section className="bg-white mx-auto max-w-[800px] min-h-screen">
      <Header />
      <main className="p-6 flex flex-col gap-6">
        <section className="border border-primary-dark-gray rounded-2xl p-5 flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold">What’s on your mind?</h2>
          <PostForm />
        </section>
        <PostsList />
      </main>
    </section>
  )
}
