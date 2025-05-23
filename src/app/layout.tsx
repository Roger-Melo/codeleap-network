import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import { UsernameContextProvider } from "@/contexts/username-context-provider"
import "./globals.css"

const roboto = Roboto({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeLeap Network",
  description: "A simple application that performs basic CRUD functions",
}

type RootLayoutProps = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased bg-primary-gray min-h-screen`}>
        <UsernameContextProvider>
          {children}
        </UsernameContextProvider>
      </body>
    </html>
  )
}
