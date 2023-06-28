<<<<<<< HEAD
<script>
    import { user } from "../stores.js";
=======
<script lang="ts">
>>>>>>> dev
    export let title = "";
    export let subTitle = "";
</script>

<div class="box has-text-centered columns m-2">
    <div class="column">
        <div class="title is-5">{title}</div>
        <div class="subtitle is-5">{subTitle}</div>
    </div>
    <div class="column">
<<<<<<< HEAD
        {#if $user.email}
            <div class="is-size-7">{$user.email}</div>
        {:else}
            <div class="is-size-7">KASD-Svelte 0.1</div>
        {/if}
=======
>>>>>>> dev
    </div>
</div>
