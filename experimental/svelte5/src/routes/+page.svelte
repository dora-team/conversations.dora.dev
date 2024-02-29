<script>
    import '../app.css';

    import { browser } from "$app/environment";
    import { onDestroy } from "svelte";

    import dora_logo from '$lib/img/icon.svg'
    import questions_raw from "../assets/questions.txt?raw";
    import Question from "../lib/Question.svelte";

    let questions = questions_raw
        .split("\n")
        .sort((a, b) => 0.5 - Math.random()); // shuffle question order

    let current_question = $state(0);
    let active_questions = $state([questions[0]]);

    let timer_width_in_vw = $state(100);
    let timer_duration_in_msec = 3000;
    let timer_start = browser ? window.performance.now() : 0;
    let timer_now = browser ? window.performance.now() : 0;
    let timer_elapsed = 0;
    let frame;
    let isPlaying = $state(true);

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
    }

    function last() {
        current_question--;
        active_questions.pop();
    }

    function stopTimer() {
        cancelAnimationFrame(frame);
        isPlaying = false;
    }

    // on load, start timer
    reStartTimer();
</script>

<header>
    <a href="https://dora.dev" target="_blank"
        ><img src={dora_logo} alt="DORA" /></a
    >
</header>

<questions>
    {#each active_questions as question_text}
        <Question {question_text} />
    {/each}
</questions>

{#if isPlaying}
    <countdown style="width:{timer_width_in_vw}vw"> </countdown>
{/if}

<footer>
    <span
        class="google-material-icons"
        on:click={last}
        disabled={current_question == 0}
        style:opacity={current_question == 0 || isPlaying ? 0 : ".5"}>chevron_left</span
    >

    <span
        class="google-material-icons"
        on:click={() => {
            isPlaying ? stopTimer() : reStartTimer()
        }}
        >{#if isPlaying}stop_circle{:else}play_circle{/if}</span
    >
    <span
        class="google-material-icons"
        on:click={next}
        style:opacity={isPlaying ? 0 : ".5"}>chevron_right</span
    >
</footer>

<style>
    header {
        position: absolute;
        top: 0;
        height: 10vh;
        width:100vw;
        text-align: center;
    }

    header img {
        width: 50px;
        padding: 1vw;
    }
    questions {
        position: absolute;
        top: 10vw;
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

    footer .google-material-icons {
        cursor: pointer;
        opacity: 0.5;
        font-size: 2em;
        transition: opacity 0.1s;
    }

    footer .google-material-icons:hover {
        opacity: 0.85;
    }


    countdown {
        display: block;
        position: absolute;
        bottom: 9.5vh;
        left: 0;
        height: 2px;
        width: 100vw;
        background-color: white;
        opacity: .5;
    }
</style>
