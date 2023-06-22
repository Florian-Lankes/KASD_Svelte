<script>
    import {onMount} from "svelte";
    import {KASDMapsService} from "../services/KASD-Maps-service.js";
    let userGroups = [];
    onMount(async () => {
        userGroups = await KASDMapsService.getUserGroups();
    });
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
            </tr>
        {/each}
        </tbody>
    </table>
</div>
