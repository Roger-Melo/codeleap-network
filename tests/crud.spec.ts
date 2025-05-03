import { type PostFormType } from "@/lib/types"
import { test, expect, type Page } from "@playwright/test"

type CommonPostProps = {
  post: PostFormType
  page: Page
}

const posts = [
  { title: "Post 1", content: "Parágrafo 1 do post 1.\n\nParágrafo 2 do post 1." },
  { title: "Post 2", content: "Parágrafo 1 do post 2.\n\nParágrafo 2 do post 2." },
  { title: "Post 3", content: "Parágrafo 1 do post 3.\n\nParágrafo 2 do post 3." },
] as const

async function awaitFiveSeconds(page: Page) {
  // necessary to skip the optimistic UI test & test the real outcome confirmed by the server
  await page.waitForTimeout(5_000)
}

async function createPost({ post, page }: CommonPostProps) {
  const inputTitle = page.getByLabel("Title")
  const textAreaContent = page.getByLabel("Content")
  const buttonCreatePost = page.getByRole("button", { name: "Create" })
  await inputTitle.fill(post.title)
  await textAreaContent.fill(post.content)
  await buttonCreatePost.click()
}

async function checkCreatedPost({ post, page }: CommonPostProps) {
  await awaitFiveSeconds(page)
  await expect(page.getByRole("heading", { name: post.title })).toBeVisible()
  const firstPostParagraphs = post.content.split("\n\n")
  await expect(page.getByRole("listitem").filter({ hasText: firstPostParagraphs[0] })).toBeVisible()
  await expect(page.getByRole("listitem").filter({ hasText: firstPostParagraphs[1] })).toBeVisible()
}

test.beforeEach("Access /feed", async ({ page }) => {
  await page.goto("/")
  await page.getByLabel("Please enter your username").fill("r_user")
  await page.getByRole("button", { name: "Enter" }).click()
  await page.waitForURL("/feed")
  await expect(page.getByRole("heading", { name: "CodeLeap Network" })).toBeVisible()
})

test.describe("New post", () => {
  test("Create posts on posts list", async ({ page }) => {
    for (const post of posts) {
      await createPost({ post, page })
      await checkCreatedPost({ post, page })
    }
  })
})
