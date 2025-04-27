import { PostForm } from "@/components/post-form"
import { PostsList } from "@/components/posts-list"

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
        <PostForm />
        <PostsList />
      </main>
    </section>
  )
}
