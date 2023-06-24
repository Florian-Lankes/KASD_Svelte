<script>
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import DisplayImages from "$lib/DisplayImages.svelte";

    export let data;

</script>

<Header>
    <MainNavigator />
</Header>

<DisplayImages passedImages={data}/>