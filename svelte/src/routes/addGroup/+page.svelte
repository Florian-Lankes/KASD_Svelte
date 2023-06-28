<script lang="ts">
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import AddGroup from "$lib/AddGroup.svelte";
</script>

<Header>
    <MainNavigator />
</Header>

<div class="column box has-text-centered">
        <h1 class="title is-4">Add Group</h1>
        <AddGroup />
</div>
