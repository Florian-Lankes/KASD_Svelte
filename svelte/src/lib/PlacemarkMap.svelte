<script>
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-map";
    import { onMount } from "svelte";
    import {KASDMapsService} from "../services/KASD-Maps-service.js";
    import { latestPlacemark } from "../stores.js";

    const mapConfig = {
        location: {latitude: 49.020895276653654, longitude: 12.1018256612773},
        zoom: 8,
        minZoom: 1
    };

    let map;
    onMount(async () => {
        map = new LeafletMap("placemark-map", mapConfig);
        map.showZoomControl();
        map.addLayerGroup('Placemarks');
        map.showLayerControl();
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

<div class="box" id="placemark-map" style="height:75vh" />
