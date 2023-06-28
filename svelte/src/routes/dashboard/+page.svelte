<script lang="ts">
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import PlacemarkTable from '$lib/PlacemarkTable.svelte';
    import GroupTable from "$lib/GroupTable.svelte";
    let udef = undefined;
</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns">
    <div class="column box has-text-centered columns">
        <PlacemarkTable propValue= {udef} titlePage = {udef}/>
        <GroupTable />
    </div>
</div>