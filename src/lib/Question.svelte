<script>
    export let question_text = "<placeholder>";

    let question_text_sentences = [];

    let question_text_escaped = question_text
        .replaceAll(". ",".<LINEBREAK>")
        .replaceAll("? ","?<LINEBREAK>")

    question_text_escaped.split("<LINEBREAK>").forEach((sentence) => {
        question_text_sentences.push(sentence)
    })

</script>

<section>
    {#each question_text_sentences as sentence}
        <p>{sentence}</p>
    {/each}
</section>

<style>
    section {
        box-sizing: border-box;
        width: 100vw;
        height: 80vh;
        text-align: center;
        padding: 1vw 5vw;
        font-size: 5vw;
    }

    section p {
        margin:2vw 0;
        text-shadow: var(--dora-dark-blue) 3px 3px;
    }
</style>
