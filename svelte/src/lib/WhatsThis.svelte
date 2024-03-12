<div class="whatsthis">
    <button class="material-symbols-outlined" popovertarget="whatisthispopover"
        >help</button
    >
</div>

<div popover id="whatisthispopover">
    <h1>Get better at getting better</h1>
    <p>
        Want better team performance and well-being? Start a conversation to
        understand where you are today, and discover opportunities for
        improvement. Use these questions to kick off a discussion and see where
        it takes you.
    </p>
    <p>
        <a href="/submit" target="_blank" class="submit">Suggest a question</a>
        <br>
        <small>or, <a href="https://github.com/dora-team/conversations.dora.dev/edit/main/svelte/src/assets/questions.txt" target="_blank">open a PR</a></small>
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
</div>

<style>
    .whatsthis {
        display: inline-block;
        position: fixed;
        right: 0;
        top: 0;
        padding: 1em;
    }

    .whatsthis button {
        background: transparent;
        border:none;
        color:white;
        font-size:1.5rem;
    }

    @media screen and (min-width: 720px) and (min-height: 600px) {
        .whatsthis button {
            font-size: 2rem;
        }
    }

    ::backdrop {
        background-color: rgba(0, 0, 0, 0.7);
        transition: opacity 0.3s;
    }

    #whatisthispopover:popover-open {
        width: 80vw;
        max-width: 50em;
        background-color: white;
        padding: 0.5em;
        border-radius: 0.5em;
    }

    div.modal h1 {
        color: var(--dora-blue);
    }

    .close {
        color: grey;
        cursor: pointer;
        border-top: 1px solid lightgrey;
        padding-top: 0.5em;
        font-size: 85%;
    }
    .close button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    #whatisthispopover p {
        color: #003;
        padding: 0.5em;
        font-size:1.25rem;
    }

    #whatisthispopover p.resources {
        font-weight: 200;
        font-size: 1rem;
    }

    #whatisthispopover p a {
        text-decoration: none;
        color: var(--dora-blue);
    }

    a.submit {
        font-size: 1.5em;
        font-weight: bold;
        color: var(--dora-blue);
        text-decoration: none;
        border: 1px solid var(--dora-blue);
        display: inline-block;
        padding: 0.25em;
    }

    small {
        font-size:.75rem;
    }
</style>
