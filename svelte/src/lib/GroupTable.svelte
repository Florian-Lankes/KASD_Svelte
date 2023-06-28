<script lang="ts">
    import {onMount} from "svelte";
    import {KASDMapsService} from "../services/KASD-Maps-service.ts";
    import {latestRoute} from "../stores.ts";
    import {goto} from "$app/navigation";
    let userGroups = [];
    onMount(async () => {
        userGroups = await KASDMapsService.getUserGroups();
    });

    async function deleteGroup(GroupId: string) {
        // add placemarkId to group._id
        const response = await KASDMapsService.deleteGroup(GroupId);
        if(response) {
            const route = "/dashboard";
            latestRoute.update(() => route);
            await goto("/reload");
        }
    }
</script>

<div class="column box has-text-centered m-4">
    <h1 class="title is-5" >Groups: </h1>
    <table class="table is-fullwidth">
        <thead>
        <th>Name</th>
        <th>Edit</th>
        </thead>
        <tbody>
        {#each userGroups as group}
            <tr>
                <td>
                    {group.title}
                </td>
                <td>
                    <a href="/dashboard/group/{group._id}" class="button">
                        <i class="fas fa-folder-open"></i>
                    </a>
                </td>
                <td>
                    <button on:click={() => deleteGroup(group._id)}>
                        <i class="fas fa-trash fa-2x"></i>
                    </button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
