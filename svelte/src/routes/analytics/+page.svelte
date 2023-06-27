<script lang="ts">
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import ChartTypeForm from "$lib/ChartTypeForm.svelte";
    import {latestChartType} from "../../stores.ts";
    import UserChart from "$lib/UserChart.svelte";


    let chartType:string;
    latestChartType.subscribe((value) => {
        chartType = value;
    });

</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Analytics</h1>
        <ChartTypeForm />
        <UserChart charttype="{chartType}"/>
    </div>
</div>
