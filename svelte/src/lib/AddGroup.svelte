<script lang="ts">
    // @ts-nocheck
    import { onMount } from "svelte";
    import { KASDMapsService } from "../services/KASD-Maps-service.ts";

    let title = "";

    let message = "";

    onMount(async () => {

    });

    async function add() {
        if (title) {
            const group = {
                title: title
            };
            const success = await KASDMapsService.addGroup(group);
            if (!success) {
                message = "Couldn't add Group. Something went wrong";
                return;
            }
            message = `You added Group ${title}`;
        } else {
            message = "Please select all required fields";
        }
    }
</script>

<form on:submit|preventDefault={add}>
    <div class="field">
        <label class="label" for="title">Enter Title</label>
        <input bind:value={title} class="input" id="title" name="title" type="text" />
    </div>
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Add Group</button>
        </div>
    </div>
    <div>
        {message}
    </div>
</form>
