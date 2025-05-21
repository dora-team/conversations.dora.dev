<script>
    import "../app.css";

    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { onMount, onDestroy } from "svelte";

    import dora_logo from "$lib/img/icon.svg";
    import { questionsUnrandomized, hash } from "$lib/index.js";
    import Question from "../lib/Question.svelte";
    import WhatsThis from "../lib/WhatsThis.svelte";

    // create copy of array on-the-fly, because netlify barfs when we try to use toSorted()
    let questions = [...questionsUnrandomized].sort((a, b) => 0.5 - Math.random()); // shuffle question order

    let current_question = $state(0);
    let active_questions = $state([]);

    let timer_width_in_vw = $state(100);
    let timer_duration_in_msec = 15000;
    let timer_start = browser ? window.performance.now() : 0;
    let timer_now = browser ? window.performance.now() : 0;
    let timer_elapsed = 0;
    let frame;
    let isPlaying = $state(true);

    function updateQuestionParam() {
        const questionHash = active_questions[active_questions.length - 1].hash;
        const url = `?q=${questionHash}`;
        goto(url, { keepfocus: true, replaceState: true, noscroll: true });
    }

    onMount(() => {
        const params = new URLSearchParams(location.search);
        const hash = params.get("q");
        if (hash) {
            const index = questions.findIndex((q) => q.hash === hash);
            if (index !== -1) {
                current_question = index;
                active_questions = [questions[current_question]];
                console.log(active_questions[0], current_question)
            } else {
                console.error("Question not found");
            }
        }
        if (active_questions.length === 0) {
            active_questions.push(questions[current_question]);
        }
        updateQuestionParam();
    });

    function startTimer() {
        isPlaying = true;
        frame = browser ? requestAnimationFrame(startTimer) : null;
        timer_now = browser ? window.performance.now() : 0;

        timer_elapsed = (timer_now - timer_start) / timer_duration_in_msec;

        timer_width_in_vw = 100 - 100 * timer_elapsed;

        if (timer_width_in_vw < 0) {
            cancelAnimationFrame(frame);
            next();
            reStartTimer();
        }
    }

    function reStartTimer() {
        timer_start = browser ? window.performance.now() : 0;
        startTimer();
    }

    onDestroy(() => {
        let cancel = browser ? cancelAnimationFrame(frame) : null;
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

    function stopTimer() {
        cancelAnimationFrame(frame);
        isPlaying = false;
    }

    function advanceAndReStartTimer() {
        next();
        reStartTimer();
    }

    // on load, start timer
    reStartTimer();
</script>

<main>
    <header>
        <a href="https://dora.dev" target="_blank"
            ><img src={dora_logo} alt="DORA" /></a
        >
        <WhatsThis />
    </header>

    <questions>
        {#each active_questions as { question_text }}
            <Question {question_text} />
        {/each}
    </questions>

    {#if isPlaying}
        <countdown style="width:{timer_width_in_vw}vw"> </countdown>
    {/if}

    <footer>
        <span
            class="material-symbols-outlined"
            on:click={last}
            disabled={current_question == 0}
            style:opacity={current_question == 0 || isPlaying ? 0 : ".5"}
            >chevron_left</span
        >

        <span
            class="material-symbols-outlined"
            on:click={() => {
                isPlaying ? stopTimer() : advanceAndReStartTimer();
            }}
            >{#if isPlaying}stop_circle{:else}play_circle{/if}</span
        >
        <span
            class="material-symbols-outlined"
            on:click={next}
            style:opacity={isPlaying ? 0 : ".5"}>chevron_right</span
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

    countdown {
        display: block;
        position: absolute;
        bottom: 9.5vh;
        left: 0;
        height: 2px;
        width: 100vw;
        background-color: var(--dora-primary-light);
        opacity: 0.5;
    }
</style>
