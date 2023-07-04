import { expect, test } from "@playwright/test";
import { clearDB, connect, disconnect } from "./dbHelpers";
import db from "../../server/src/db";
import User from "../../server/src/entity/User";
import { hash } from "argon2";

test.beforeAll(connect);
test.beforeAll(clearDB);
test.afterAll(disconnect);

test("can log in with valid credentials", async ({ page }) => {
  const firstname = "Dave";
  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";
  const createdAt = new Date();
  const hashedPassword = await hash(password);
  await db
    .getRepository(User)
    .insert({ firstname, email, password: hashedPassword, createdAt });

  await page.goto("/auth");
  await page.fill("#email", email);
  await page.fill("#password", password);

  await page.getByRole("button", { name: "Valider" }).click();

  await page.waitForURL("/");
  await expect(
    page.getByRole("heading", { name: "Bienvenue sur le site de test" })
  ).toBeVisible();
});
