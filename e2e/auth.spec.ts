import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should display login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/Sign in/);
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  });

  test("should display register page", async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveTitle(/Create an account/);
    await expect(page.getByRole("heading", { name: "Create an account" })).toBeVisible();
  });

  test("should show error for invalid login", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("invalid@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });

  test("should navigate from home to login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Sign In" }).click();
    await expect(page).toHaveURL("/login");
  });
});

test.describe("Public Pages", () => {
  test("should display home page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Open Source Ticketing Platform")).toBeVisible();
  });

  test("should display events page", async ({ page }) => {
    await page.goto("/events");
    await expect(page.getByRole("heading", { name: /Events/ })).toBeVisible();
  });
});
