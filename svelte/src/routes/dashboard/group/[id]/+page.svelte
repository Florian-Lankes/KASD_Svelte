<script>
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import PlacemarkTable from "$lib/PlacemarkTable.svelte";
    export let data;

</script>

<Header>
    <MainNavigator/>
</Header>

<section class="section columns is-vcentered">
    <PlacemarkTable propValue= {data}/>
</section>





