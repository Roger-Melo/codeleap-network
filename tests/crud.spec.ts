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

async function createPosts(page: Page) {
  const inputTitle = page.getByLabel("Title")
  const textAreaContent = page.getByLabel("Content")
  const buttonCreatePost = page.getByRole("button", { name: "Create" })
  for (const post of posts) {
    await inputTitle.fill(post.title)
    await textAreaContent.fill(post.content)
    await buttonCreatePost.click()
  }
}

async function checkCreatedPosts(page: Page) {
  for (const post of posts) {
    const postTitle = page.getByRole("heading", { name: post.title })
    await expect(postTitle).toBeVisible()
    const postParagraphs = post.content.split("\n\n")
    await expect(page.getByRole("listitem").filter({ hasText: postParagraphs[0] })).toBeVisible()
    await expect(page.getByRole("listitem").filter({ hasText: postParagraphs[1] })).toBeVisible()
  }
}

test.beforeEach("Access /feed", async ({ page }) => {
  await page.goto("/")
  await page.getByLabel("Please enter your username").fill("r_user")
  await page.getByRole("button", { name: "Enter" }).click()
  await page.waitForURL("/feed")
  await expect(page.getByRole("heading", { name: "CodeLeap Network" })).toBeVisible()
})

test.describe("Post creation", () => {
  test("Create posts on posts list", async ({ page }) => {
    await createPosts(page)
    await awaitFiveSeconds(page)
    await checkCreatedPosts(page)
  })
})

/*
async function deletePost({ post, page }: CommonPostProps) {
  const selectedPost = page.getByRole("listitem").filter({ hasText: post.title })
  await selectedPost.getByTestId("deletePost").click()
  const deleteButton = page.getByRole("button", { name: "Delete" })
  deleteButton.click()
return selectedPost
}

async function checkDeletedPost({ selectedPost, page }: { selectedPost: Locator, page: Page }) {
  await awaitFiveSeconds(page)
  await expect(selectedPost).not.toBeVisible()
}

test.describe("Post deletion", () => {
  test("Delete posts from posts list", async ({ page }) => {
    for (const post of posts) {
      await createPost({ post, page })
    }
    await awaitFiveSeconds(page)
    await checkCreatedPost({ post: posts[0], page })
    await checkCreatedPost({ post: posts[1], page })
    await checkCreatedPost({ post: posts[2], page })

    for (const post of posts) {
      await deletePost({ post, page })
const selectedPost = await deletePost({ post, page })
await checkDeletedPost({ selectedPost, page })
    }
    await awaitFiveSeconds(page)
    await expect(page.getByRole("listitem")).not.toHaveText(posts[0].title)
    await expect(page.getByRole("listitem")).not.toHaveText(posts[1].title)
    await expect(page.getByRole("listitem")).not.toHaveText(posts[2].title)
  })
})
*/
