<script>
    import "../../app.css";

    import { browser } from "$app/environment";
    import { onMount, onDestroy, tick } from "svelte";
    import { pushState } from "$app/navigation";

    import dora_survey_logo from "$lib/img/survey-banner.png";
    import { surveyQuestionsUnrandomized, hash } from "$lib/index.js";
    import Question from "../../lib/Question.svelte";
    import WhatsThis from "../../lib/WhatsThis.svelte";

    // create copy of array on-the-fly, because netlify barfs when we try to use toSorted()
    let questions = [...surveyQuestionsUnrandomized].sort(
        (a, b) => 0.5 - Math.random(),
    ); // shuffle question order

    let current_question = $state(0);
    let active_questions = $state([]);

    function updateQuestionParam() {
        const url = new URL(location);
        url.searchParams.set(
            "q",
            active_questions[active_questions.length - 1].hash,
        );
        pushState(url);
    }

    onMount(async () => {
        // run a tick to initialize router
        await tick();

        const params = new URLSearchParams(location.search);
        const hash = params.get("q");
        if (hash) {
            const index = questions.findIndex((q) => q.hash === hash);
            if (index !== -1) {
                current_question = index;
                active_questions = [questions[current_question]];
            } else {
                console.error("Question not found");
            }
        }
        if (active_questions.length === 0) {
            active_questions.push(questions[current_question]);
        }
        updateQuestionParam();
    });

    function next() {
        current_question++;
        active_questions.push(questions[current_question % questions.length]);
        updateQuestionParam();
    }

    function last() {
        current_question--;
        active_questions.pop();
    }
</script>

<main>
    <header>
        <a href="https://dora.dev/survey/" target="_blank"
            ><img src={dora_survey_logo} alt="DORA" /></a
        >
        <WhatsThis />
    </header>

    <questions>
        {#each active_questions as { question_text }}
            <Question {question_text} />
        {/each}
    </questions>

    <footer>
        <span
            class="material-symbols-outlined"
            onclick={last}
            disabled={current_question == 0}
            style:opacity={current_question == 0 ? 0 : ".5"}
            >chevron_left</span
        >
        <span
            class="material-symbols-outlined"
            onclick={next}
            >chevron_right</span
        >
    </footer>
</main>

<style>
    header {
        position: absolute;
        top: 0;
        height: 10vh;
        width: 100vw;
        text-align: center;
    }

    header img {
        height: 10vh;
        margin-top: 2vh;
    }
    questions {
        position: absolute;
        top: 15vh;
        height: 80vh;
    }

    footer {
        height: 9vh;
        width: 100vw;
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    footer span {
        display: inline-block;
        padding: 0 1em;
    }
</style>
