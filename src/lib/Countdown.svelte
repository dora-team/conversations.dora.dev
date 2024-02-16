<script>
    export let num_countdown_segments;
    export let activeSegment;
    export let segment_time_in_msec;
    let segments = new Array(num_countdown_segments).fill("");
</script>

<div class="countdown">
    {#each segments as segment, idx}
        <segment
            bind:this={segments[idx]}
            class:fade={idx >= activeSegment}
            style:transition={`opacity ${segment_time_in_msec}ms`}
        ></segment>
    {/each}
</div>

<style>
    div.countdown {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        width: 100vw;
        position: absolute;
        bottom: 10vh;
        left: 0;
    }

    segment {
        flex: 1;
        height: 2px;
        background-color: white;
        opacity: .5;
    }

    segment.fade {
        opacity: 0;
    }
</style>
