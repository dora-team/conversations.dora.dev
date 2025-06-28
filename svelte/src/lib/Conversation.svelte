<script>
    import "../app.css";

    import { browser } from "$app/environment";
    import { onMount, onDestroy, tick } from "svelte";
    import { pushState } from "$app/navigation";

    import Question from "./Question.svelte";
    import WhatsThis from "./WhatsThis.svelte";

    let { questionsUnrandomized, logo, showTimer = false, headerLink, timerColor = 'var(--dora-primary-light)' } = $props();

    // create copy of array on-the-fly, because netlify barfs when we try to use toSorted()
    let questions = [...questionsUnrandomized].sort(
        (a, b) => 0.5 - Math.random(),
    ); // shuffle question order

    const TIMER_DURATION_MS = 15000;

    let current_question = $state(0);
    let active_questions = $state([]);

    let timer_width_in_vw = $state(100);
    let timer_duration_in_msec = TIMER_DURATION_MS;
    let timer_start = browser ? window.performance.now() : 0;
    let timer_now = browser ? window.performance.now() : 0;
    let timer_elapsed = 0;
    let frame;
    let isPlaying = $state(true);

    function updateQuestionParam() {
        const url = new URL(location);
        url.searchParams.set(
            "q",
            active_questions.length > 0 ? active_questions[active_questions.length - 1].hash : ''
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
        if (active_questions.length === 0 && questions.length > 0) {
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
         if (showTimer && frame) {
            cancelAnimationFrame(frame);
        }
    });

    function next() {
        current_question++;
        active_questions.push(questions[current_question % questions.length]);
        updateQuestionParam();
    }

    function last() {
        current_question--;
        active_questions.pop();
        updateQuestionParam();
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
    if (showTimer) {
        reStartTimer();
    }
</script>

<main>
    <header>
        <a href={headerLink} target="_blank"
            ><img src={logo} alt="DORA" /></a
        >
        <WhatsThis />
    </header>

    <questions>
        {#each active_questions as { question_text }}
            <Question {question_text} />
        {/each}
    </questions>

    {#if showTimer}
        {#if isPlaying}
            <countdown style="width:{timer_width_in_vw}vw; --timer-color: {timerColor};"> </countdown>
        {/if}
    {/if}

    <footer>
        <button
            class="material-symbols-outlined"
            onclick={last}
            disabled={current_question == 0}
            style:opacity={current_question === 0 || (showTimer && isPlaying) ? 0 : 0.5}
            >chevron_left</button
        >

        {#if showTimer}
            <button
                class="material-symbols-outlined"
                onclick={() => {
                    isPlaying ? stopTimer() : advanceAndReStartTimer();
                }}
                >{#if isPlaying}stop_circle{:else}play_circle{/if}</button
            >
        {/if}
        <button
            class="material-symbols-outlined"
            onclick={next}
            style:opacity={showTimer && isPlaying ? 0 : .5}>chevron_right</button
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

    footer button {
        display: inline-block;
        padding: 0 1em;
        background-color: transparent;
        border: none;
        color: inherit; /* Inherit color from parent to maintain icon color */
    }

    countdown {
        display: block;
        position: absolute;
        bottom: 9.5vh;
        left: 0;
        height: 2px;
        width: 100vw;
        background-color: var(--timer-color);
        opacity: 0.5;
    }
</style>