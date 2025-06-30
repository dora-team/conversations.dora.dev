<script>
    import dora_survey_logo from "$lib/img/survey-banner.png";
    import { questionSets } from "$lib/index.js";
    import Conversation from "$lib/Conversation.svelte";
</script>

<Conversation 
    questionsUnrandomized={questionSets.survey} 
    logo={dora_survey_logo} 
    showTimer={false} 
    headerLink="https://dora.dev/survey"
/>
