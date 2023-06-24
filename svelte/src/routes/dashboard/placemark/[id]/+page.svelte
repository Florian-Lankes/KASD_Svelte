<script>
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import UploadWidget from "$lib/UploadWidget.svelte";
    import EditPlacemarkForm from "$lib/EditPlacemarkForm.svelte";
    import DisplayImages from "$lib/DisplayImages.svelte";

    export let data;
</script>

<Header>
    <MainNavigator/>
</Header>

<div>
    <div class="box has-text-centered">
        <EditPlacemarkForm passedData={data}/>
        <UploadWidget passedData={data}/>
    </div>
    <DisplayImages passedImages={data}/>
</div>








