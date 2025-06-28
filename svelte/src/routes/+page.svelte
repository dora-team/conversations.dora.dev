<script>
    import dora_logo from "$lib/img/icon.svg";
    import { questionsUnrandomized } from "$lib/index.js";
    import Conversation from "$lib/Conversation.svelte";
</script>

<Conversation 
    questionsUnrandomized={questionsUnrandomized} 
    logo={dora_logo} 
    showTimer={true} 
    headerLink="https://dora.dev"
    timerColor="var(--dora-primary-light)"
/>
