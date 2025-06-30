#!/bin/bash

# This script automates the creation of a new question set based on the README.md instructions.
# It takes one argument: the name of the question set.
# The name will be lowercased, spaces replaced with hyphens, and non-URL-safe characters replaced with hyphens.

if [ -z "$1" ]; then
  echo "Usage: $0 <question-set-name>"
  echo "Example: $0 \"My New Survey\""
  exit 1
fi

QUESTION_SET_NAME="$1"

# Trim all leading/trailing whitespace using xargs
QUESTION_SET_NAME=$(echo "$QUESTION_SET_NAME" | xargs)

# Slugify the name: lowercase, replace non-alphanumeric (except space) with hyphen,
# replace spaces with hyphens, collapse multiple hyphens, and remove leading/trailing hyphens.
# The final sed command 's/^-//;s/-$//' ensures the slug does not start or end with a hyphen.
SLUG=$(echo "$QUESTION_SET_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]/-/g' | sed 's/ /-/g' | sed 's/--/-/g' | sed 's/^-//;s/-$//')

if [ -z "$SLUG" ]; then
  echo "Error: Could not generate a valid slug from '$QUESTION_SET_NAME'. Please use a name that can be slugified."
  exit 1
fi

# Convert slug to underscore format for JavaScript variable names
SLUG_UNDERSCORED=$(echo "$SLUG" | sed 's/-/ /g' | sed 's/ /_/g')

ROUTE_DIR="src/routes/$SLUG"
PAGE_SVELTE_FILE="$ROUTE_DIR/+page.svelte"
LAYOUT_SVELTE_FILE="$ROUTE_DIR/+layout.svelte"
QUESTIONS_FILE="src/assets/$SLUG-questions.txt"
INDEX_JS_FILE="src/lib/index.js"

echo "Attempting to create new question set: '$QUESTION_SET_NAME' (slug: '$SLUG')"

# 1. Create a new route directory
if [ -d "$ROUTE_DIR" ]; then
  echo "Warning: Directory '$ROUTE_DIR' already exists. Skipping directory creation."
else
  echo "Creating directory: $ROUTE_DIR"
  mkdir -p "$ROUTE_DIR" || { echo "Error: Failed to create directory $ROUTE_DIR"; exit 1; }
fi

# 2. Create a +page.svelte file for the new route
if [ -f "$PAGE_SVELTE_FILE" ]; then
  echo "Warning: File '$PAGE_SVELTE_FILE' already exists. Skipping file creation."
else
  echo "Creating file: $PAGE_SVELTE_FILE"
  cat <<EOF_PAGE_SVELTE > "$PAGE_SVELTE_FILE"
<script>
    import dora_logo from "\$lib/img/icon.svg"; // Optional: update with your specific logo
    import { questionSets } from "\$lib/index.js";
    import Conversation from "\$lib/Conversation.svelte";
</script>

<Conversation
    questionsUnrandomized={questionSets.${SLUG_UNDERSCORED}}
    showTimer={true}
    headerLink="https://dora.dev"
    logo={dora_logo}
    timerColor="var(--dora-primary-light)"
/>
EOF_PAGE_SVELTE
  if [ $? -ne 0 ]; then echo "Error: Failed to create $PAGE_SVELTE_FILE"; exit 1; fi
fi

# 3. Create a +layout.svelte file for the new route
if [ -f "$LAYOUT_SVELTE_FILE" ]; then
  echo "Warning: File '$LAYOUT_SVELTE_FILE' already exists. Skipping file creation."
else
  echo "Creating file: $LAYOUT_SVELTE_FILE"
  cat <<EOF_LAYOUT_SVELTE > "$LAYOUT_SVELTE_FILE"
<script>
</script>

<slot />

<style>
  :global(body) {
    background-color: var(--dora-secondary-a); //change as desired --dora-secondary- a, b, and c are options
  }
</style>
EOF_LAYOUT_SVELTE
  if [ $? -ne 0 ]; then echo "Error: Failed to create $LAYOUT_SVELTE_FILE"; exit 1; fi
fi

# 4. Create a new questions file
if [ -f "$QUESTIONS_FILE" ]; then
  echo "Warning: File '$QUESTIONS_FILE' already exists. Skipping file creation."
else
  echo "Creating file: $QUESTIONS_FILE"
  printf "What questions do you have?\n\n" > "$QUESTIONS_FILE" || { echo "Error: Failed to create $QUESTIONS_FILE"; exit 1; }
fi

# 5. Import and process the new questions in src/lib/index.js
IMPORT_LINE="import ${SLUG_UNDERSCORED}_questions_raw from \"../assets/${SLUG}-questions.txt?raw\";"
PROCESS_LINE="const ${SLUG_UNDERSCORED} = processQuestions(${SLUG_UNDERSCORED}_questions_raw);"
EXPORT_LINE="  ${SLUG_UNDERSCORED},"
PATH_MAP_LINE="  \"/${SLUG}\": \"${SLUG_UNDERSCORED}\","

if grep -qF "$IMPORT_LINE" "$INDEX_JS_FILE"; then
  echo "Warning: Import line for '$SLUG' already exists in '$INDEX_JS_FILE'. Skipping modification."
else
  echo "Updating file: $INDEX_JS_FILE"

  # Use ed to perform the file modifications. This is a robust and portable method.
  # The here-document (<<-ED_SCRIPT) provides a clean way to pass commands to ed.
  ed -s "$INDEX_JS_FILE" <<-ED_SCRIPT
1i
$IMPORT_LINE
.
/^export const questionSets/i
$PROCESS_LINE
.
/^};/i
$EXPORT_LINE
.
/^export const questionSetPathMap = {/a
.
/^};/i
$PATH_MAP_LINE
.
w
q
ED_SCRIPT

  if [ $? -ne 0 ]; then echo "Error: Failed to update $INDEX_JS_FILE"; exit 1; fi
fi

echo "Successfully processed new question set for '$QUESTION_SET_NAME'!"
echo "Your new question set is accessible at /${SLUG}"
echo "Remember to add your questions to $QUESTIONS_FILE"
echo "You may also want to add a logo and update the headerLink in $PAGE_SVELTE_FILE if needed."
