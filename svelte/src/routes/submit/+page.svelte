<script>
    // in prod, Netlify will handle this redirect
    import { onMount } from "svelte";
    onMount(() => {
        const theForm =
            "https://docs.google.com/forms/d/e/1FAIpQLScAlCWWiCV3mlzAfHYLQxW1CjSaHoNFkXSCsTYFOcrhFx2aSQ/viewform";
        window.location.replace(theForm);
    });
</script>
