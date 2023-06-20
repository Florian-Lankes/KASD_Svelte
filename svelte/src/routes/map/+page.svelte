<script>
    import { beforeUpdate } from "svelte";
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import { KASDMapsService } from "../../services/KASD-Maps-service.js";

    beforeUpdate(() => {
        KASDMapsService.reload();
    });
</script>

<Header>
    <MainNavigator />
</Header>

<PlacemarkMap />
