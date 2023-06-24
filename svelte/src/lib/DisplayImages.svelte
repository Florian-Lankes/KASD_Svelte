<script>

    export let passedImages;

</script>
<div class="box has-text-centered">
    <h1 class="title is-5" >Images</h1>
    {#each passedImages.images as image}
        <img src={image.secure_url} class="m-2" alt="" width="500" height="600">
    {/each}
</div>
