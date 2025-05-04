import { test, expect, type Page } from "@playwright/test"

test.describe.configure({ mode: "serial" })

const posts = [
  { title: "Post 1", content: "Parágrafo 1 do post 1.\n\nParágrafo 2 do post 1." },
  { title: "Post 2", content: "Parágrafo 1 do post 2.\n\nParágrafo 2 do post 2." },
  { title: "Post 3", content: "Parágrafo 1 do post 3.\n\nParágrafo 2 do post 3." },
] as const

async function awaitFiveSeconds(page: Page) {
  // necessary to skip the optimistic UI test & test the real outcome confirmed by the server
  await page.waitForTimeout(5_000)
}

async function deletePosts(page: Page) {
  for (const post of posts) {
    const selectedPost = page.getByRole("listitem").filter({ hasText: post.title }).first()
    await selectedPost.getByTestId("deletePostButton").click()
    await page.getByRole("button", { name: "Delete" }).click()
  }
  await checkDeletedPosts(page)
}

async function checkDeletedPosts(page: Page) {
  await awaitFiveSeconds(page)
  for (const post of posts) {
    await expect(page.locator("main")).not.toHaveText(post.title)
  }
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
  await checkCreatedPosts(page)
}

async function checkCreatedPosts(page: Page) {
  await awaitFiveSeconds(page)
  for (const post of posts) {
    const postItem = page.getByRole("listitem").filter({ hasText: post.title }).first()
    await expect(postItem.getByRole("heading", { name: post.title })).toBeVisible()
    const [firstParagraph, secondParagraph] = post.content.split("\n\n")
    await expect(postItem).toContainText(firstParagraph)
    await expect(postItem).toContainText(secondParagraph)
  }
}

const updatedPosts = [
  { originalTitle: "Post 1", title: "Post 1 (editado)", content: "Parágrafo 1 do post 1 (editado).\n\nParágrafo 2 do post 1 (editado)." },
  { originalTitle: "Post 2", title: "Post 2 (editado)", content: "Parágrafo 1 do post 2 (editado).\n\nParágrafo 2 do post 2 (editado)." },
  { originalTitle: "Post 3", title: "Post 3 (editado)", content: "Parágrafo 1 do post 3 (editado).\n\nParágrafo 2 do post 3 (editado)." },
] as const

async function editPosts(page: Page) {
  for (const post of updatedPosts) {
    const selectedPost = page.getByRole("listitem").filter({ hasText: post.originalTitle }).first()
    await selectedPost.getByTestId("editPostButton").click()

    const editPostDialog = page.getByRole("dialog", { name: "Edit post" })
    await expect(editPostDialog).toBeVisible()

    await editPostDialog.getByPlaceholder("Hello world").fill(post.title)
    await editPostDialog.getByPlaceholder("Content here").fill(post.content)

    await editPostDialog.getByRole("button", { name: "Save changes" }).click()
    await expect(editPostDialog).not.toBeVisible()
  }
  await checkEditedPosts(page)
}

async function checkEditedPosts(page: Page) {
  await awaitFiveSeconds(page)
  for (const post of updatedPosts) {
    const postItem = page.getByRole("listitem").filter({ hasText: post.title }).first()
    await expect(postItem.getByRole("heading", { name: post.title })).toBeVisible()
    const [firstParagraph, secondParagraph] = post.content.split("\n\n")
    await expect(postItem).toContainText(firstParagraph)
    await expect(postItem).toContainText(secondParagraph)
  }
}

test.beforeEach("Access /feed", async ({ page }) => {
  await page.goto("/")
  await page.getByLabel("Please enter your username").pressSequentially("r_user")
  await page.getByRole("button", { name: "Enter" }).click()
  await page.waitForURL("/feed")
  await expect(page.getByRole("heading", { name: "CodeLeap Network" })).toBeVisible()
})

test.describe("Post creation", () => {
  test("Create posts on posts list", async ({ page }) => {
    await createPosts(page)
    await deletePosts(page)
  })
})

test.describe("Post deletion", () => {
  test("Delete posts from posts list", async ({ page }) => {
    await createPosts(page)
    await deletePosts(page)
  })
})

test.describe("Post editing", () => {
  test("Edit posts on posts list", async ({ page }) => {
    await createPosts(page)
    await editPosts(page)
    await deletePosts(page)
  })
})
