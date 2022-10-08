import { test, expect } from "@playwright/test";

const email = process.env.TESTING_EMAIL!;
const password = process.env.TESTING_PASSWORD!;

test("Testing sign in with correct email and password", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("http://localhost:3000/signIn");

  await page.getByLabel("Email").click();

  await page.getByLabel("Email").fill(email);

  await page.getByLabel("Password").click();

  await page.getByLabel("Password").fill(password);

  await page.getByRole("button", { name: "Sign In" }).click();

  await page.screenshot();

  await page.waitForNavigation();

  await expect(page).toHaveURL("http://localhost:3000/");

  await page
    .locator('header:has-text("MSBD5017 HomePages")')
    .getByRole("paragraph")
    .click();

  await page.getByText("Sign Out").click();
});

test("Testing sign in with incorrect email and password", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("http://localhost:3000/signIn");

  await page.getByLabel("Email").click();

  await page.getByLabel("Email").fill("sss@wrong.com");

  await page.getByLabel("Email").press("Tab");

  await page.getByLabel("Password").fill("12345");

  await page.getByRole("button", { name: "Sign In" }).click();

  const errorMsg = page.getByText("Invalid login credentials");

  await expect(errorMsg).toBeVisible();
});
