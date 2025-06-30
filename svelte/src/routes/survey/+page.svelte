<script>
    import dora_survey_logo from "$lib/img/survey-banner.png";
    import { surveyQuestionsUnrandomized } from "$lib/index.js";
    import Conversation from "$lib/Conversation.svelte";
</script>

<Conversation 
    questionsUnrandomized={surveyQuestionsUnrandomized} 
    logo={dora_survey_logo} 
    showTimer={false} 
    headerLink="https://dora.dev/survey"
/>
