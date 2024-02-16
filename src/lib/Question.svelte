<script>
    export let question_text = "<placeholder>";
    export let isActive = false;

    let question_text_sentences = [];

    let question_text_escaped = question_text
        .replaceAll(". ",".<LINEBREAK>")
        .replaceAll("? ","?<LINEBREAK>")

    question_text_escaped.split("<LINEBREAK>").forEach((sentence) => {
        question_text_sentences.push(sentence)
    })

</script>

<section class:isActive>
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
        font-size: 5em;
        position:absolute;
        top:10vh;
        opacity:0;
        transition: opacity 1s ease-out;
    }

    section.isActive {
        opacity:1;
    }

    section p {
        margin:2vw 0;
        text-shadow: var(--dora-dark-blue) 3px 3px;
    }
</style>
