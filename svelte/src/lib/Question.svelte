<script>
    import { fly } from "svelte/transition";
    let { question_text = "" } = $props();

    let question_text_sentences = [];

    let question_text_escaped = question_text
        .replaceAll(". ", ".<LINEBREAK>")
        .replaceAll("? ", "?<LINEBREAK>");

    question_text_escaped.split("<LINEBREAK>").forEach((sentence) => {
        question_text_sentences.push(sentence);
    });
</script>

<question
    in:fly={{ x: "100vw", duration: 500 }}
    out:fly={{ x: "100vw", duration: 500 }}
>
    <p_wrapper>
    {#each question_text_sentences as sentence}
        <p>{sentence}</p>
    {/each}
</p_wrapper>
</question>

<style>
    question {
        width: 100vw;
        height:100%;
        background-color: var(--dora-blue);
        left: 0px;
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        overflow:hidden;
    }

    @media screen and (min-width:720px) and (min-height:600px) {
    question {
        font-size:5rem;
    }
}

    p_wrapper {       
        width:100vw;
        flex-direction: column; 
        padding: 0 5vw 5vw 5vw;
    }

    p {
        text-align: center;
        text-shadow: var(--dora-dark-blue) 2px 2px;
        margin-block-start: 1rem;
        margin-block-end: 1rem;
        transition: opacity .2s ease-out;
    }

    question:not(:last-child)  p {
        /* as a question is replaced, fade it out */
        opacity:0; 
    }
</style>
