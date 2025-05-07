import { Header } from "@/components/header"
import { CreatePostSection } from "@/components/create-post-section"
import { PostsList } from "@/components/posts-list"

export default function FeedPage () {
  return (
    <section className="bg-white mx-auto max-w-[800px] min-h-screen">
      <Header />
      <main className="p-6 flex flex-col gap-6">
        <CreatePostSection />
        <PostsList />
      </main>
    </section>
  )
}
