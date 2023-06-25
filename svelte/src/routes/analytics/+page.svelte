<script>
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import UserChart from "$lib/UserChart.svelte";

</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Analytics</h1>
        <UserChart />
    </div>
</div>
