<script lang="ts">
    import { beforeUpdate } from "svelte";
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import { KASDMapsService } from "../../services/KASD-Maps-service.ts";

    beforeUpdate(() => {
        KASDMapsService.reload();
    });
</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns">
    <div class="column">
        <PlacemarkMap mapName="placemark-map1" layerControl={false} activeLayer= {false}/>
    </div>
    <div class="column">
        <PlacemarkMap mapName="placemark-map2" layerControl={false} activeLayer= "Topographic"/>
    </div>
    <div class="column">
        <PlacemarkMap mapName="placemark-map3" layerControl={false} activeLayer= "Satellite"/>
    </div>
</div>
