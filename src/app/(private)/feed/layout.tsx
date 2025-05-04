import { postsDataSchema } from "@/lib/types"
import { baseUrl } from "@/lib/utils"
import { FeedClientWrapper } from "@/components/feed-client-wrapper"

function PageErrorMessage() {
  return (
    <h2 className="text-center mx-auto text-primary-red">
      Could not get the page. Please try again in a few minutes.
    </h2>
  )
}

type FeedLayoutProps = { children: React.ReactNode }

export default async function FeedLayout({ children }: FeedLayoutProps) {
  const response = await fetch(baseUrl, { cache: "no-store" })

  if (!response.ok) {
    return <PageErrorMessage />
  }

  const data: unknown = await response.json()
  console.log("data:", data)
  const validatedData = postsDataSchema.safeParse(data)
  console.log("validatedData:", validatedData)
  return validatedData.success
    ? <FeedClientWrapper data={validatedData.data.results}>{children}</FeedClientWrapper>
    : <PageErrorMessage />
}
