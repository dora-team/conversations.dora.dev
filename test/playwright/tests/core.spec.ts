import { test, expect } from '@playwright/test';

const testCases = [
  { name: 'Default questions', route: '/' },
  { name: 'Survey questions', route: '/survey' }
];

for (const { name, route } of testCases) {
  test.describe(name, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(route);
    });

    test('loading the page works and includes a question', async ({ page }) => {
      const questions = page.locator('.question p');
      await expect(questions.first()).toBeVisible();
      const texts = await questions.allTextContents();
      expect(texts.join(' ').length).toBeGreaterThan(0);
    });

    test('loading with a specific question shows that question', async ({ page }) => {
      // Open the "What's This" popover to get a valid question hash
      await page.locator('button:has-text("help")').click();
      await page.getByRole('button', { name: 'All Questions' }).click();

      // Wait for the list to appear
      const firstLink = page.locator('.question_link a').first();
      await expect(firstLink).toBeVisible();

      // Get the text and href from the first question
      const questionText = await firstLink.textContent();
      const href = await firstLink.getAttribute('href');
      expect(href).not.toBeNull();

      // Navigate to the specific question URL
      await page.goto(href!);

      // Check if the text matches.
      // Note: toHaveText with a string checks for exact match of the element's text.
      // If there are multiple elements, we need to check them all or join them.
      const expected = questionText!.replace(/\s+/g, ' ').trim();
      const getQuestionText = async () => {
        const texts = await page.locator('.question p').allTextContents();
        return texts.join(' ').replace(/\s+/g, ' ').trim();
      };

      await expect.poll(async () => getQuestionText()).toBe(expected);
    });

    test('user can stop automatic rotation', async ({ page }) => {
      if (route === '/survey') test.skip(true, 'Survey page does not have a timer');

      const stopButton = page.locator('button:has-text("stop_circle")');
      await expect(stopButton).toBeVisible();
      await stopButton.click();

      const playButton = page.locator('button:has-text("play_circle")');
      await expect(playButton).toBeVisible();
      await expect(stopButton).not.toBeVisible();
    });

    test('with questions stopped, user can move forward or backward', async ({ page }) => {
      if (route === '/survey') test.skip(true, 'Survey page does not have a timer');

      // Stop first
      await page.locator('button:has-text("stop_circle")').click();

      const getQuestionText = async () => {
        const texts = await page.locator('.question p').allTextContents();
        return texts.join(' ');
      };

      const initialQuestion = await getQuestionText();

      // Move forward
      const nextButton = page.locator('button:has-text("chevron_right")');
      await expect(nextButton).toBeEnabled();
      await nextButton.click();

      await expect.poll(async () => getQuestionText()).not.toBe(initialQuestion);

      // Move backward
      const prevButton = page.locator('button:has-text("chevron_left")');
      await expect(prevButton).toBeEnabled();
      await prevButton.click();
      await expect.poll(async () => getQuestionText()).toBe(initialQuestion);
    });

    test('user can click ? and see pop-up starting on About tab', async ({ page }) => {
      await page.locator('button:has-text("help")').click();
      const popover = page.locator('#whatisthispopover');
      await expect(popover).toBeVisible();

      // Check About tab is active
      await expect(page.locator('.tab.active')).toHaveText('About');
      await expect(page.getByRole('heading', { name: 'Get better at getting better' })).toBeVisible();
    });

    test('user can move between about and questions tabs', async ({ page }) => {
      await page.locator('button:has-text("help")').click();

      // Click Questions tab
      await page.getByRole('button', { name: 'All Questions' }).click();
      await expect(page.locator('.tab.active')).toHaveText('All Questions');

      // Wait for the list to appear
      await expect(page.locator('.question_link a').first()).toBeVisible();

      // Click About tab
      await page.getByRole('button', { name: 'About' }).click();
      await expect(page.locator('.tab.active')).toHaveText('About');
    });

    test('clicking a question in the list shows question in a new tab', async ({ page }) => {
      await page.locator('button:has-text("help")').click();
      await page.getByRole('button', { name: 'All Questions' }).click();

      // Wait for the list to appear
      await expect(page.locator('.question_link a').first()).toBeVisible();

      // Get the first question link
      const firstQuestionLink = page.locator('.question_link a').first();
      const questionText = await firstQuestionLink.textContent();

      // Click it
      // Note: The link opens in a new tab (target="_blank").
      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        firstQuestionLink.click()
      ]);

      // The requirement is now that the pop-up should remain open on the original page.
      await expect(page.locator('#whatisthispopover')).toBeVisible();

      await newPage.waitForLoadState();
      // The question might be split into multiple p tags.
      // Let's get all text from all p tags and join them.
      const expected = questionText!.replace(/\s+/g, ' ').trim();
      // Wait for the text to appear and match
      await expect.poll(async () => {
        const pTags = newPage.locator('.question p');
        const allText = await pTags.allTextContents();
        const joinedText = allText.join(' ');
        return joinedText.replace(/\s+/g, ' ').trim();
      }).toBe(expected);
    });

    test('popup closes when clicking close button', async ({ page }) => {
      await page.locator('button:has-text("help")').click();
      await expect(page.locator('#whatisthispopover')).toBeVisible();

      await page.locator('.close button').click();
      await expect(page.locator('#whatisthispopover')).not.toBeVisible();
    });

    test('popup closes when clicking outside', async ({ page }) => {
      await page.locator('button:has-text("help")').click();
      await expect(page.locator('#whatisthispopover')).toBeVisible();

      await page.mouse.click(10, 10);
      await expect(page.locator('#whatisthispopover')).not.toBeVisible();
    });
  });
}
