<script>
    import Question from "./lib/Question.svelte";
    import question_texts_raw from "./assets/questions.txt?raw";

    let question_texts = question_texts_raw
        .split("\n")
        .sort((a, b) => 0.5 - Math.random()); // shuffle question order

    let active_question = Math.floor(Math.random() * question_texts.length);

    function nextQuestion() {
        active_question = (active_question + 1) % question_texts.length;
    }
    function previousQuestion() {
        active_question =
            active_question == 0
                ? question_texts.length - 1
                : active_question - 1;
    }

    let rotation;
    let rotation_time_in_sec = 15;
    function startRotation() {
        rotation = setInterval(nextQuestion, rotation_time_in_sec * 1000);
    }
    function stopRotation() {
        clearInterval(rotation);
    }

    let isPlaying = true;

    $: isPlaying ? startRotation() : stopRotation();
</script>

<header>
    <a href="https://dora.dev" target="_blank"
        ><img src="/icon.svg" alt="DORA" /></a
    >
</header>

{#each question_texts as question_text, idx}
    <Question {question_text} isActive={idx == active_question} />
{/each}

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
        text-align: center;
    }

    footer span {
        display: inline-block;
        padding: 0 1em;
    }

    footer .google-material-icons {
        cursor: pointer;
        opacity: 0.5;
        font-size: 2em;
        transition: opacity .1s;
    }

    footer .google-material-icons:hover {
        opacity: 0.85;
    }
</style>
