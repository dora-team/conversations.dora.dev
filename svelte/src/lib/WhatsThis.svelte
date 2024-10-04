<script>
    import { onMount } from "svelte";
    import { questionsUnrandomized } from "$lib/index.js";

    let tab = $state("about");

    function getLink(hash) {
        // Get window.location.href without query params
        const url = new URL(window.location.href);
        url.search = "";
        url.searchParams.set("q", hash);
        return url.href;
    }

    onMount(() => {
        if (typeof window !== "undefined") {
            // if queryparam `?whatsthis` is specified, open the "what's this" popover on page load
            const searchParams = new URLSearchParams(window.location.search);
            if (
                searchParams.has("whatsthis") &&
                HTMLElement.prototype.hasOwnProperty("popover")
            ) {
                document.querySelector("#whatisthispopover").showPopover();
            }
        }
    });
</script>

<div class="whatsthis">
    <div class="site_name">conversations.dora.dev</div>
    <button class="material-symbols-outlined" popovertarget="whatisthispopover"
        >help</button
    >
</div>

<div popover id="whatisthispopover">
    <div class="tabs">
        <button
            class="tab {tab === 'about' ? 'active' : ''}"
            on:click={() => {
                tab = "about";
            }}>About</button
        >
        <button
            class="tab {tab === 'questions' ? 'active' : ''}"
            on:click={() => {
                tab = "questions";
            }}>All Questions</button
        >
    </div>

    {#if tab === "about"}
        <h1>Get better at getting better</h1>
        <p>
            Want better team performance and well-being? Start a conversation to
            understand where you are today, and discover opportunities for
            improvement. Use these questions to kick off a discussion and see
            where it takes you.
        </p>
        <p>
            Got a question? <a href="/submit" target="_blank"
                >Submit a pull request</a
            > to add it!
        </p>
        <p class="resources">
            Find more resources at <a href="https://dora.dev" target="_blank"
                >dora.dev</a
            >, and join our global community of practice at
            <a href="https://dora.community" target="_blank">dora.community.</a>
        </p>
        <div class="close">
            <button popovertarget="whatisthispopover">close</button>
        </div>
    {:else if tab === "questions"}
        <h1>All Questions</h1>
        <div class="scroll">
            <ul>
                {#each questionsUnrandomized as { question_text, hash }}
                    <li class="question_link">
                        <a href={getLink(hash)} target="_blank"
                            >{question_text}</a
                        >
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>

<style lang="scss">

    .question_link {
        a {
            text-decoration: none;
            color: var(--dora-tertiary-b);
        }

        text-align: left;
        margin-bottom: 0.5em;
        margin-right: 1em;
    }

    .tabs {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        width: calc(100% + 2em);
        margin-top: -0.5em;
        margin-left: -1em;
        margin-right: -1em;
    }

    .tab {
        background-color: var(--dora-primary-light);
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        transition: background-color 0.3s;
        flex-grow: 1;
    }

    .whatsthis {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        position: fixed;
        right: 0;
        top: 0;
        padding: 1em;
    }

    .whatsthis .site_name {
        font-size: 1.25rem;
        opacity: .85;
        user-select: none;
        display: none; /* don't show unless screen is large enough (see below) */
        color: var(--dora-primary-light);
    }

    .whatsthis button {
        background: transparent;
        border: none;
        color: var(--dora-primary-light);
        font-size: 1.5rem;
    }

    @media screen and (min-width: 720px) and (min-height: 600px) {
        .whatsthis button {
            font-size: 2rem;
        }

        .whatsthis .site_name {
            display: block;
        }
    }

    ::backdrop {
        background-color: var(--dora-primary-dark);
        opacity: 0.8;
        transition: opacity 0.3s;
    }

    #whatisthispopover:popover-open {
        width: 80vw;
        max-width: 50em;
        background-color: var(--dora-primary-light);
        padding: 0.5em;
        border-radius: 0.5em;
    }

    div.modal h1 {
        color: var(--dora-background-color);
    }

    .close {
        cursor: pointer;
        border-top: 1px solid var(--dora-primary-medium);
        padding-top: 0.5em;
        font-size: 85%;
    }
    .close button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    #whatisthispopover p {
        padding: 0.5em;
        font-size: 1.25rem;
    }

    #whatisthispopover p.resources {
        font-weight: 200;
        font-size: 1rem;
    }

    #whatisthispopover p a {
        text-decoration: none;
        color: var(--dora-secondary-a);
    }

    a.submit {
        font-size: 1.5em;
        font-weight: bold;
        text-decoration: none;
        display: inline-block;
        padding: 0.25em;
    }

    small {
        font-size: 0.75rem;
    }

    .scroll {
        overflow-y: scroll;
        height: 40vh;
    }

    .tab:not(.active) {
        background-color: var(--dora-primary-medium);
        color: var(--dora-primary-light);
    }

    .tab.active {
        background-color: var(--dora-primary-light);
        border-bottom: 1px solid var(--dora-primary-light);
    }
</style>
