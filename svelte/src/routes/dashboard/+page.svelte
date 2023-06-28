<<<<<<< HEAD
<script>
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
=======
<script lang="ts">
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import PlacemarkTable from '$lib/PlacemarkTable.svelte';
    import GroupTable from "$lib/GroupTable.svelte";
    let udef = undefined;
>>>>>>> dev
</script>

<Header>
    <MainNavigator />
</Header>

<<<<<<< HEAD
<div class="columns is-vcentered">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Dashboard</h1>
=======
<div class="columns">
    <div class="column box has-text-centered columns">
        <PlacemarkTable propValue= {udef} titlePage = {udef}/>
        <GroupTable />
>>>>>>> dev
    </div>
</div>
