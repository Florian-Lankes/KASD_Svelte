<script lang="ts">
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import PlacemarkTable from "$lib/PlacemarkTable.svelte";
    export let data: object;

</script>

<Header>
    <MainNavigator/>
</Header>

<section class="section">
    <PlacemarkTable propValue= {data} titlePage = {data.group.title}/>
</section>





