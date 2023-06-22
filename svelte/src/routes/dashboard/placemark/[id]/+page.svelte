<script>
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";

    export let data;

</script>

<Header>
    <MainNavigator/>
</Header>

<section class="section columns is-vcentered">
    <div class="column">
        <div class="name title">
            {data.placemark.name}
        </div>
        <div>
            <div>
                <p class="title is-5">Description: </p>
                <p class="subtitle is-6">{data.placemark.description}</p>
            </div>
            <div>
                <p class="title is-5">Latitude: </p>
                <p class="subtitle is-6">{data.placemark.location.latitude}</p>
            </div>
            <div>
                <p class="title is-5">Longitude: </p>
                <p class="subtitle is-6">{data.placemark.location.longitude}</p>
            </div>
            <div>
                <p class="title is-5">Category: </p>
                <p class="subtitle is-6">{data.placemark.category}</p>
            </div>
        </div>
    </div>
    <div class="column">
        <div class="card">
            <div class="card-image">
                <figure class="image is-256x256">
                    <img src={data.placemark.image} alt="">
                </figure>
            </div>
        </div>
    </div>
</section>





