<script>
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import UserChart from "$lib/UserChart.svelte";
    import ChartTypeForm from "$lib/ChartTypeForm.svelte";
    import {latestChartType} from "../../stores.js";

    let latestChartTypeValue;

    latestChartType.subscribe((value) => {
        latestChartTypeValue = value;
    });


</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Analytics</h1>
        <UserChart charttype={latestChartTypeValue}/>
    </div>
</div>
