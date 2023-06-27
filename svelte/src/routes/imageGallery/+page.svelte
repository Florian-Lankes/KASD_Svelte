<script lang="ts">
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import DisplayImages from "$lib/DisplayImages.svelte";

    export let data; // TODO ts

</script>

<Header>
    <MainNavigator />
</Header>

<DisplayImages passedData={data}/>