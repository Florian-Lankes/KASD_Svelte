<script lang="ts">
    import Chart from "svelte-frappe-charts";
    import { onMount } from "svelte";
    import { KASDMapsService } from "../services/KASD-Maps-service.ts";

    let analytics: object = {
        userCount: 0,
        placemarkCount: 0,
        soccerFieldCount: 0,
        worldWonderCount: 0,
        riverCount: 0,
        bridgeCount: 0,
        townCount: 0,
        cityCount: 0,
        forestCount: 0,
        landscapeFeatureCount: 0,
        nationalMonumentCount: 0,
        walkingTrailCount: 0,
        treeCount: 0,
        entertainmentVenueCount: 0,
        islandCount: 0,
        archaeologicalFeatureCount: 0,
        othersCount: 0
    };
    onMount( async () => {
        analytics = await KASDMapsService.getAnalytics();
        data.datasets[0].values[0] = analytics.userCount;
        data.datasets[0].values[1] = analytics.placemarkCount;

        data2.datasets[0].values[0] = analytics.soccerFieldCount;
        data2.datasets[0].values[1] = analytics.worldWonderCount;
        data2.datasets[0].values[2] = analytics.riverCount;
        data2.datasets[0].values[3] = analytics.bridgeCount;
        data2.datasets[0].values[4] = analytics.townCount;
        data2.datasets[0].values[5] = analytics.cityCount;
        data2.datasets[0].values[6] = analytics.forestCount;
        data2.datasets[0].values[7] = analytics.landscapeFeatureCount;
        data2.datasets[0].values[8] = analytics.nationalMonumentCount;
        data2.datasets[0].values[9] = analytics.walkingTrailCount;
        data2.datasets[0].values[10] = analytics.treeCount;
        data2.datasets[0].values[11] = analytics.entertainmentVenueCount;
        data2.datasets[0].values[12] = analytics.islandCount;
        data2.datasets[0].values[13] = analytics.archaeologicalFeatureCount;
        data2.datasets[0].values[14] = analytics.othersCount;
    });


    let data = {
        labels: ["Users", "Placemarks"],
        datasets: [
            {
                values: [0 ,0]
            }
        ]
    };

    let data2 = {
        labels: ["Soccer-field", "World-wonder", "River", "Bridge", "Town", "City", "Forest", "Landscape-feature", "National-monument", "Walking-Trail", "Tree", "Entertainment-Venue", "Island", "Archaeological-Feature", "Others"],
        datasets: [
            {
                values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    };

     export let charttype: string;


</script>
<div>
    <div class="column box m-4">
        <h1 class="title is-4">Users to date | Placemarks to date</h1>
        <Chart data={data} type={charttype}  />
    </div>
    <div class="column box m-4">
        <h1 class="title is-4">Placemarks Types to date</h1>
        <Chart data={data2} type={charttype} />
    </div>
</div>



