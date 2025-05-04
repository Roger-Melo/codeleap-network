import { FeedClientWrapper } from "@/components/feed-client-wrapper"

type FeedLayoutProps = { children: React.ReactNode }

export default async function FeedLayout({ children }: FeedLayoutProps) {
  return <FeedClientWrapper>{children}</FeedClientWrapper>
}
