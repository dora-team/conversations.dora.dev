<script>
    import Question from "./lib/Question.svelte";
    import question_texts_raw from "./assets/questions.txt?raw";

    let question_texts = question_texts_raw.split("\n");
</script>

<header>
    <a href="https://dora.dev" target="_blank"
        ><img src="/icon.svg" alt="DORA" /></a
    >
</header>

<Question
    question_text={question_texts[
        Math.floor(Math.random() * question_texts.length)
    ]}
/>

<footer>(TODO)</footer>

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
        text-align: center;
    }
</style>
