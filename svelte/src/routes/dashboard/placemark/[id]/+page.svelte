<script>
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import UploadWidget from "$lib/UploadWidget.svelte";

    export let data;

    let input;
    let container;
    let image;


    function onChange() {
        const file = input.files[0];

        if (file) {

            const reader = new FileReader();
            reader.addEventListener("load", function () {
                image.setAttribute("src", reader.result);
                console.log("image: ");
                console.log(image);
            });
            reader.readAsDataURL(file);
            return;
        }
    }
</script>

<Header>
    <MainNavigator/>
</Header>

<section class="section columns is-vcentered">

    <form method="POST" action="/?editPlacemark">
        <label>Edit Placemark: </label>
        <div class="field is horizontal">
            <div class="field-body">
                <div class="field">
                    <label class="label">Title
                        <input class="input" type="text" name="name" value="{data.placemark.name}">
                    </label>
                </div>
                <div class="field">
                    <label class="label">Description
                        <input class="input" type="text" name="description" value="{data.placemark.description}">
                    </label>

                </div>
                <div class="field">
                    <label class="label">Latitude
                        <input class="input" type="number" min="-90" max="90" name="latitude" step="0.000000000000001" value="{data.placemark.location.latitude}">
                    </label>

                </div>
                <div class="field">
                    <label class="label">Longitude
                        <input class="input" type="number" min="-180" max="180" name="longitude" step="0.000000000000001" value="{data.placemark.location.longitude}">
                    </label>

                </div>
                <div class="field">
                    <label class="label">Category
                        <div class="control">
                            <div class="select">
                                <select class="input" name="category">
                                    <option>Soccer field</option>
                                    <option>World wonder</option>
                                    <option>River</option>
                                    <option>Bridge</option>
                                    <option>Town</option>
                                    <option>City</option>
                                    <option>Forest</option>
                                    <option>Landscape feature</option>
                                    <option>National monument</option>
                                    <option>Walking Trail</option>
                                    <option>Tree</option>
                                    <option>Entertainment Venue</option>
                                    <option>Island</option>
                                    <option>Archaeological Feature</option>
                                    <option>Others</option>
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="field">
                    <label for="imagefile" class="label">Upload Image
                        <input class="input" id="imagefile" name="imagefile" type="file" accept="image/png, image/jpeg">
                    </label>
                </div>

                <input
                        bind:this={input}
                        on:change={onChange}
                        type="file"
                />

            </div>
        </div>
        <button formaction="?/editPlacemark">Register</button>
    </form>
</section>

<div bind:this={container}>
        <img bind:this={image} src="" alt="Preview" />
</div>

<UploadWidget passedData={data}/>






