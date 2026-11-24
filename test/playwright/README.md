# Playwright Tests

This directory contains end-to-end tests for the application using [Playwright](https://playwright.dev).

## Directory Structure

*   `playwright.config.ts`: Playwright configuration file.
*   `tests/`: Directory containing test files.
*   `playwright-report/` and `test-results/`: Generated output (git-ignored).

## How the tests run

The tests run against the production build, not the dev server. Playwright starts `vite preview` on port 4173, which serves the `build/` directory, so you must build the site before running the tests. Only the Chromium project is enabled.

## Setup

Install dependencies and the Chromium browser that matches the installed Playwright version:

```bash
npm install
npx playwright install chromium
```

Rerun `npx playwright install chromium` whenever `@playwright/test` is upgraded. If you skip it, every test fails with `Executable doesn't exist`.

## Running Tests

Run these commands from the repository root:

| Command | What it does |
| --- | --- |
| `npm run test:e2e` | Builds the site, then runs the tests. |
| `npm run test:e2e:run` | Runs the tests against the existing `build/`. Use after `npm run build`. |
| `npm run ci:test:e2e` | Installs browsers, then runs the tests. Netlify runs this after every build (see `netlify.toml`), so a failing test blocks the deploy. |

To pass Playwright options, add them after `--`, for example:

```bash
npm run test:e2e:run -- --headed
npm run test:e2e:run -- -g "popup closes"
```

Running `npx playwright test` from the repository root without `-c test/playwright/playwright.config.ts` does not load this config, and every test fails with `Cannot navigate to invalid URL`.

### Viewing the report

```bash
npx playwright show-report test/playwright/playwright-report
```

### Testing a deployed site

Set `PLAYWRIGHT_BASE_URL` to run the tests against another URL:

```bash
PLAYWRIGHT_BASE_URL=https://conversations.dora.dev npm run test:e2e:run
```

The local preview server still starts, so a local build is still required.

## Writing Tests

Add new test files to the `tests/` directory with a `.spec.ts` extension.
