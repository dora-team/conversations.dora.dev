<script>
    import dora_logo from "$lib/img/icon.svg";
    import { questionSets } from "$lib/index.js";
    import Conversation from "$lib/Conversation.svelte";
</script>

<Conversation
    questionsUnrandomized={questionSets.conversation}
    logo={dora_logo}
    showTimer={true}
    headerLink="https://dora.dev"
    timerColor="var(--dora-primary-light)"
/>
