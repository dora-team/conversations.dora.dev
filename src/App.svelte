<script>
    import Question from "./lib/Question.svelte";
    import Countdown from "./lib/Countdown.svelte";
    import question_texts_raw from "./assets/questions.txt?raw";

    let isPlaying = true;
    let rotation_interval, segment_interval;
    let rotation_time_in_msec = 15000;
    let num_countdown_segments = 20;
    let activeSegment = num_countdown_segments + 1;
    let segment_time_in_msec = rotation_time_in_msec / num_countdown_segments;

    let question_texts = question_texts_raw
        .split("\n")
        .sort((a, b) => 0.5 - Math.random()); // shuffle question order

    let active_question = 0;

    function nextQuestion() {
        active_question = (active_question + 1) % question_texts.length;
        doCountdown();
    }
    function previousQuestion() {
        active_question =
            active_question == 0
                ? question_texts.length - 1
                : active_question - 1;
    }

    function doCountdown() {
        clearInterval(segment_interval);
        activeSegment--;

        if (activeSegment == -1) {
            activeSegment = num_countdown_segments;
        }

        segment_interval = setInterval(
            doCountdown,
            rotation_time_in_msec / (num_countdown_segments + 1),
        );
    }

    function startRotation() {
        rotation_interval = setInterval(nextQuestion, rotation_time_in_msec);
        doCountdown();
    }
    function stopRotation() {
        clearInterval(rotation_interval);
        clearInterval(segment_interval);
        activeSegment = num_countdown_segments + 1;
    }

    $: isPlaying ? startRotation() : stopRotation();
</script>

<header>
    <a href="https://dora.dev" target="_blank"
        ><img src="/icon.svg" alt="DORA" /></a
    >
</header>

{#each question_texts as question_text, idx}
    <Question {question_text} isActive={idx == active_question} {isPlaying} />
{/each}

{#if isPlaying}
    <Countdown
        {num_countdown_segments}
        {activeSegment}
        {segment_time_in_msec}
    />
{/if}

<footer>
    <span
        class="google-material-icons"
        on:click={previousQuestion}
        style:opacity={isPlaying ? 0 : ".5"}>chevron_left</span
    >

    <span
        class="google-material-icons"
        on:click={() => {
            isPlaying = !isPlaying;
        }}
        >{#if isPlaying}stop_circle{:else}play_circle{/if}</span
    >
    <span
        class="google-material-icons"
        on:click={nextQuestion}
        style:opacity={isPlaying ? 0 : ".5"}>chevron_right</span
    >
</footer>

<style>
    header {
        text-align: center;
        height: 10vh;
    }

    header img {
        width: 50px;
        padding: 1vw;
    }

    footer {
        height: 10vh;
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
</style>
