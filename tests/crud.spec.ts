import { test, expect } from "@playwright/test"

const exampleText = `Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.

Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.`

test.beforeEach("Access /feed", async ({ page }) => {
  await page.goto("/")
  await page.getByLabel("Please enter your username").fill("r_user")
  await page.getByRole("button", { name: "Enter" }).click()
  await page.waitForURL("/feed")
  await expect(page.getByRole("heading", { name: "CodeLeap Network" })).toBeVisible()
})

test.describe("New post", () => {
  test("Create posts on posts list", async ({ page }) => {
    const inputTitle = page.getByLabel("Title")
    const textAreaContent = page.getByLabel("Content")
    const buttonCreatePost = page.getByRole("button", { name: "Create" })

    await inputTitle.fill("post 1")
    await textAreaContent.fill(exampleText)
    await buttonCreatePost.click()
  })
})
