<script>
    // in prod, Netlify will handle this redirect
    import { onMount } from "svelte";
    onMount(() => {
        const submitLink =
            "https://github.com/dora-team/conversations.dora.dev/tree/main/src/assets";
        console.log("redirecting to " + submitLink);
        window.location.replace(submitLink);
    });
</script>
