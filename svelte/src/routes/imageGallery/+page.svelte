<script lang="ts">
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import DisplayImages from "$lib/DisplayImages.svelte";
    import type {PassedDataForImage} from "../../services/types.ts";

    export let data: PassedDataForImage;

</script>

<Header>
    <MainNavigator />
</Header>

<DisplayImages passedData={data}/>