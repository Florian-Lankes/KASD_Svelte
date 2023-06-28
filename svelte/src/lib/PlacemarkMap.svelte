<script lang="ts">
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-map";
    import { onMount } from "svelte";
    import {KASDMapsService} from "../services/KASD-Maps-service.ts";
    import { latestPlacemark } from "../stores.ts";

    const mapConfig = {
        location: {latitude: 49.020895276653654, longitude: 12.1018256612773},
        zoom: 8,
        minZoom: 1
    };
    export let layerControl:boolean;
    export let activeLayer = "";
    export let mapName = "";

    let map;
    onMount(async () => {
        map = new LeafletMap(mapName, mapConfig, activeLayer);
        map.showZoomControl();
        map.addLayerGroup("Placemarks");
        map.showLayerControl(layerControl);
        const placemarks = await KASDMapsService.getAllPlacemarks();
        placemarks.forEach((placemark) => {
            map.addMarker({ latitude: placemark.location.latitude, longitude: placemark.location.longitude }, placemark.name, "Placemarks");
        });
    });

    latestPlacemark.subscribe((placemark) => {
        if (placemark && map) {
            map.addMarker({ latitude: placemark.location.latitude, longitude: placemark.location.longitude }, placemark.name, "Placemarks");
        }
    });

</script>

<div class="box" id={mapName} style="height:75vh" />
