import { defineConfig } from '@playwright/test';

// default baseURL is local svelte server. Override by setting environment var PLAYWRIGHT_BASE_URL
const defaultBaseURL = 'http://localhost:5173'


export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    cwd: '../../',
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || defaultBaseURL,
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
