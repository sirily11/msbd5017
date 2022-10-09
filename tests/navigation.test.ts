import { test, expect } from "@playwright/test";

const homePage = "http://localhost:3000/";

test("Testing navigation between pages", async ({ page }) => {
  await page.goto(homePage);

  let firstRow = page.getByRole("row").nth(1);
  expect(firstRow).toBeVisible();

  let links = firstRow.locator("a");

  let categoryLink = links.nth(0);
  let nameLink = links.nth(1);

  let nameText = await nameLink.innerText();
  let categoryText = await categoryLink.innerText();

  await nameLink.click();
  await expect(page.getByText(nameText).first()).toBeVisible();

  await page.goto(homePage);

  await categoryLink.click();
  await expect(page.getByText(categoryText).first()).toBeVisible();

  firstRow = page.getByRole("row").nth(1);
  links = firstRow.locator("a");
  expect(await links.count()).toBe(1);

  nameLink = links.nth(0);
  nameText = await nameLink.innerText();

  await nameLink.click();
  await expect(page.getByText(nameText).first()).toBeVisible();
});
