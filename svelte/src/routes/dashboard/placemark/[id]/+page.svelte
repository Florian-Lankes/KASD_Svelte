<script lang="ts">
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import EditPlacemarkForm from "$lib/EditPlacemarkForm.svelte";
    import DisplayImages from "$lib/DisplayImages.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {KASDMapsService} from "../../../../services/KASD-Maps-service";
    import type {PassedDataForImage, Placemark} from "../../../../services/types";
    import {latestRoute} from "../../../../stores.ts";

    export let data: PassedDataForImage;
    // $: data = data;

    let placemark: Placemark;

    const apiKey = import.meta.env.VITE_openweatherapi;
    let conditions;


    onMount(async () => {
        placemark = await KASDMapsService.getPlacemark(data.placemark._id);
        const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${placemark.location.latitude}&lon=${placemark.location.longitude}&units=metric&appid=${apiKey}`;

        await fetch(requestUrl, {
            mode: 'cors'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                conditions = data;
            });
        console.log(conditions);
    });


    let fileName = "";
    let files;

    async function addImages() {
        if (files.length > 0) {
            fileName = "";
            for (const element of files) {
                fileName += element.name + ", ";
            }
        }
    }

    async function uploadImages() {
        console.log("inside");
        await KASDMapsService.uploadImage(placemark._id, files);
        const route = "/dashboard/placemark/" + placemark._id;
        latestRoute.update(() => route);
        await goto("/reload");
    }

</script>

<Header>
    <MainNavigator/>
</Header>

<div>
    <div class="box has-text-centered">
        <EditPlacemarkForm passedData={data}/>
        <form on:submit|preventDefault={uploadImages} enctype="multipart/form-data">
            <div id="file-select" class="file has-name is-fullwidth">
                <label class="file-label">
                    <input bind:files on:change={addImages} class="file-input"
                           name="imagefile" type="file" accept="image/png, image/jpeg">
                    <span class="file-cta">
                        <span class="file-icon">
                              <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file…
                        </span>
                    </span>
                    <span class="file-name">{fileName}</span>
                </label>
                <button type="submit" class="button is-info">Upload</button>
            </div>
        </form>
    </div>
    <div class="columns m-0">
        <div class="column box">
            <h1>Weather in {conditions?.name}: </h1>
            <h2 class="is-size-1">{conditions?.main.temp}°C</h2>
            <h3 class="is-size-3">Feels like {conditions?.main.feels_like}°C</h3>
            <p>{conditions?.weather[0].description}</p>
            <p>Humidity: {conditions?.main.humidity}%</p>
        </div>
    </div>


    <DisplayImages passedData={data}/>

</div>








