# conversations.dora.dev

[![Netlify Status](https://api.netlify.com/api/v1/badges/90820f65-464e-4803-a16c-68749aca01e8/deploy-status)](https://app.netlify.com/projects/conversations-dora-dev/deploys)

# Start a conversation
Want better team performance and well-being? Start a conversation to understand where you are today, and discover opportunities for improvement. The questions on [conversations.dora.dev](https://conversations.dora.dev) don't have easy answers. They're meant to provoke discussions among your team, or individual reflection. Use them as part of your journey of continuous improvement!

### Implementation
This site uses the [Svelte](https://svelte.dev) javascript framework.

### Hosting
The site is hosted on [Netlify](https://www.netlify.com/).

## Local development

To develop locally, run:

- `npm install`
- `npm run dev`

### Adding a New Question Set
To add a new set of questions, use the `create-question-set.sh` script.

This script automates the creation of the necessary files and updates `src/lib/index.js`.

**Usage:**

Run the script with your desired question set name as an argument. The name will be lowercased, spaces replaced with hyphens, and non-URL-safe characters replaced with hyphens to form the URL slug and file names.
    Example:
    ```bash
    ./create-question-set.sh "Continuous Integration Survey"
    ```
    This will create a new question set accessible at `/continuous-integration-survey`.

**What the script does:**

*   Creates a new directory under `src/routes/` (e.g., `src/routes/my-new-question-set/`).
*   Creates a `+page.svelte` file within the new route directory, pre-configured to use the `Conversation.svelte` component with `showTimer={true}`.
*   Creates a new text file under `src/assets/` (e.g., `src/assets/continuous-integration-survey.txt`) and pre-populates it with "What questions do you have?".
*   Adds the necessary import and export statements to `src/lib/index.js` for your new question set.

**After running the script:**

*   Remember to add your specific questions to the newly created `src/assets/<your-slug>-questions.txt` file.
*   You may also want to add a logo and update the `headerLink` in the `+page.svelte` file if needed.

Your new question set will be accessible at the specified route (e.g., `/continuous-integration-survey`).
