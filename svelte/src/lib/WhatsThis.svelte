<script>
    let showModal = $state(false);

    function clickOutsideModal(event) {
        if (event.target.id && event.target.id == "overlay") {
            showModal = false;
        }
    }
</script>

<div class="whatsthis">
    <span
        title="What's this?"
        class="material-symbols-outlined"
        onclick={() => {
            showModal = !showModal;
        }}
        onkeyup={() => {
            showModal = !showModal;
        }}
        role="button"
        tabindex="0">help</span
    >
</div>

<overlay
    style:display={showModal ? "block" : "none"}
    onclick={clickOutsideModal}
    id="overlay"
    onkeyup={() => (showModal = false)}
    role="button"
    tabindex="-1"
>
    <div class="modal">
        <h1>Get better at getting better</h1>
        <p>
            Want better team performance and well-being? Start a conversation to
            understand where you are today, and discover opportunities for
            improvement. Use these questions to kick off a discussion and see
            where it takes you.
        </p>
        <p>
            <a href="/submit" target="_blank" class="submit">Add a question</a>
        </p>
        <p class="resources">
            Find more resources at <a href="https://dora.dev" target="_blank"
                >dora.dev</a
            >, and join our global community of practice at
            <a href="https://dora.community" target="_blank">dora.community.</a>
        </p>
        <div class="close">
            <span
                title="close"
                onclick={() => {
                    showModal = false;
                }}
                onkeyup={() => {
                    showModal = false;
                }}
                role="button"
                tabindex="0">close</span
            >
        </div>
    </div>
</overlay>

<style>
    .whatsthis {
        display: inline-block;
        position: fixed;
        right: 0;
        top: 0;
        padding: 1em;
        font-size: .75em;
    }

    @media screen and (min-width: 720px) and (min-height: 600px) {
        .whatsthis {
            font-size: 1em;
        }
    }

    overlay {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        transition: opacity 0.3s;
    }

    div.modal {
        position: fixed;
        left: 50vw;
        top: 10vh;
        width:80vw;
        max-width: 50em;
        transform: translateX(-50%);
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
    .close:hover {
        text-decoration: underline;
    }

    .modal p {
        color: #003;
        padding: 0.5em;
    }

    .modal p.resources {
        font-weight: 200;
        font-size: 85%;
    }

    .modal p a {
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
</style>
