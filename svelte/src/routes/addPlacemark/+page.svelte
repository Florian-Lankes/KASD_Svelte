<script lang="ts">
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import AddPlacemark from '$lib/AddPlacemark.svelte';
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns">
    <div class="column box has-text-centered columns">

        <div class="column has-text-centered">
            <PlacemarkMap mapName="placemark-map" layerControl={true} activeLayer= {false}/>
        </div>
        <div class="column box has-text-centered">
            <h1 class="title is-4">Add Placemark</h1>
            <AddPlacemark />
        </div>
    </div>
</div>
