import { postsDataSchema } from "@/lib/types"
import { PostsContextProvider } from "@/contexts/posts-context-provider"
import { baseUrl } from "@/lib/utils"
import { ClientProtection } from "@/components/client-protection"

function PageErrorMessage() {
  return (
    <h2 className="text-center mx-auto text-primary-red">
      Could not get the page. Please try again in a few minutes.
    </h2>
  )
}

type FeedLayoutProps = { children: React.ReactNode }

export default async function FeedLayout({ children }: FeedLayoutProps) {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    return <PageErrorMessage />
  }

  const data: unknown = await response.json()
  const validatedData = postsDataSchema.safeParse(data)
  return validatedData.success
    ? (
      <PostsContextProvider data={validatedData.data.results}>
        <ClientProtection>
          {children}
        </ClientProtection>
      </PostsContextProvider>
    )
    : <PageErrorMessage />
}
