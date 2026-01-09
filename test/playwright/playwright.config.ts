import { defineConfig } from '@playwright/test';

const VITE_PREVIEW_PORT = 4173;
const VITE_PREVIEW_URL = `http://localhost:${VITE_PREVIEW_PORT}`;


export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  webServer: {
    command: `npm run preview -- --port ${VITE_PREVIEW_PORT}`,
    url: VITE_PREVIEW_URL,
    reuseExistingServer: !process.env.CI,
    cwd: '../../',
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || VITE_PREVIEW_URL,
    trace: 'on-first-retry',
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },
  ],
});
