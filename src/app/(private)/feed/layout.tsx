import { postsDataSchema } from "@/lib/types"
import { PostsContextProvider } from "@/contexts/posts-context-provider"

function ErrorMessage() {
  return (
    <h2 className="text-center mx-auto text-primary-red">
      Could not get posts data. Please try again in a few minutes.
    </h2>
  )
}

type FeedLayoutProps = { children: React.ReactNode }

export default async function FeedLayout({ children }: FeedLayoutProps) {
  const response = await fetch("https://dev.codeleap.co.uk/careers/")
  if (!response.ok) {
    return <ErrorMessage />
  }

  const data: unknown = await response.json()
  const validatedData = postsDataSchema.safeParse(data)
  return validatedData.success
    ? <PostsContextProvider data={validatedData.data.results}>{children}</PostsContextProvider>
    : <ErrorMessage />
}
