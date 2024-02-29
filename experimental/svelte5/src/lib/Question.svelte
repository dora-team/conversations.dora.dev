<script>
    import { fly } from "svelte/transition";
    let { question_text = "" } = $props();
</script>

<question
    in:fly={{ x: "100vw", duration: 300 }}
    out:fly={{ x: "100vw", duration: 300 }}>{question_text}</question
>

<style>
    question {
        width: 100vw;
        height: 100%;
        display: block;
        background-color: var(--dora-blue);
        position: absolute;
        left: 0px;
    }
</style>
