import { Header } from "@/components/header"
import { PostForm } from "@/components/post-form"
import { PostsList } from "@/components/posts-list"

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
