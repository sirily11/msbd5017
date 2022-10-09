import { test, expect } from "@playwright/test";

const email = process.env.TESTING_EMAIL!;
const password = process.env.TESTING_PASSWORD!;

test("Testing create group without signing in", async ({ page }) => {
  await page.goto("http://localhost:3000/signIn");

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
});

test("Testing edit group without signing in ", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  let firstRow = page.getByRole("row").nth(1);

  let links = firstRow.locator("a");

  let nameLink = links.nth(1);
  await nameLink.click();

  await page.getByRole("button", { name: "Edit group info" }).click();
  await expect(page).toHaveURL("http://localhost:3000/signIn");

  await page.getByRole("heading", { name: "Sign In" }).click();
});

test("Testing create group with signing in", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("http://localhost:3000/signIn");

  await page.getByLabel("Email").click();

  await page.getByLabel("Email").fill(email);

  await page.getByLabel("Email").press("Tab");

  await page.getByLabel("Password").fill(password);

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByRole("button", { name: "Add Group" }).click();
  await expect(page).toHaveURL("http://localhost:3000/group/create");

  await expect(page.locator('role=heading[name="Description"]')).toBeVisible();
});

test("Testing edit group with signing in ", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("http://localhost:3000/signIn");

  await page.getByLabel("Email").click();

  await page.getByLabel("Email").fill(email);

  await page.getByLabel("Email").press("Tab");

  await page.getByLabel("Password").fill(password);

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page).toHaveURL("http://localhost:3000/");

  let firstRow = page.getByRole("row").nth(1);

  let links = firstRow.locator("a");

  let nameLink = links.nth(1);
  await nameLink.click();

  await page.getByRole("button", { name: "Edit group info" }).click();

  await expect(page.locator('role=heading[name="Description"]')).toBeVisible();
});
