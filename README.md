# conversations.dora.dev

## to develop locally
- `npm install`
- `npm run dev`

## Adding a New Question Set
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
