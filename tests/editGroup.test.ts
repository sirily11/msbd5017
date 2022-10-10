import { test, expect } from "@playwright/test";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

const email = process.env.TESTING_EMAIL!;
const password = process.env.TESTING_PASSWORD!;

test("Testing edit group info without permission", async ({ page }) => {
  const unqiueName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "-",
    length: 3,
  });

  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("http://localhost:3000/signIn");

  await page.getByLabel("Email").click();

  await page.getByLabel("Email").fill(email);

  await page.getByLabel("Email").press("Tab");

  await page.getByLabel("Password").fill(password);

  await page
    .locator('form:has-text("EmailEmailPasswordPasswordSign InSign Up")')
    .getByRole("button", { name: "Sign In" })
    .click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.goto("http://localhost:3000/group/23");

  await page.getByRole("button", { name: "Edit group info" }).click();
  await expect(page).toHaveURL("http://localhost:3000/group/23/edit");

  await page.getByPlaceholder("Name").click();

  await page.getByPlaceholder("Name").press("Meta+a");

  await page.getByPlaceholder("Name").fill(unqiueName);

  await page.getByRole("button", { name: "Save Group Info" }).click();

  await page
    .getByText(
      "Error Updating group: JSON object requested, multiple (or no) rows returned"
    )
    .click();
});

test("Testing edit group with permission", async ({ page }) => {
  const unqiueName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "-",
    length: 3,
  });

  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("http://localhost:3000/signIn");

  await page.getByLabel("Email").click();

  await page.getByLabel("Email").fill(email);

  await page.getByLabel("Email").press("Tab");

  await page.getByLabel("Password").fill(password);

  await page
    .locator('form:has-text("EmailEmailPasswordPasswordSign InSign Up")')
    .getByRole("button", { name: "Sign In" })
    .click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.goto("http://localhost:3000/group/11");

  await page.getByRole("button", { name: "Edit group info" }).click();
  await expect(page).toHaveURL("http://localhost:3000/group/11/edit");

  await page.getByPlaceholder("Name").click();

  await page.getByPlaceholder("Name").fill(unqiueName);

  await page.getByRole("button", { name: "Save Group Info" }).click();

  await page.getByText("Successfully Updated group").click();
});
