import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
   test('has title', async ({ page }) => {
      await page.pause()
      await page.goto('http://localhost:5173/')

      await expect(page).toHaveTitle('AI Writer Assistant')
   })

   test('get started navigation', async ({ page }) => {
      await page.goto('http://localhost:5173/')

      const heroCTA = page.getByTestId('@hero/register-link')
      await heroCTA.click()

      await expect(page).toHaveURL('http://localhost:5173/auth/register')
   })
})
