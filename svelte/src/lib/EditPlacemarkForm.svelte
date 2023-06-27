<script lang="ts">
    export let passedData; // TODO ts
</script>

<form method="POST" action="/?editPlacemark">
    <label>Edit Placemark: </label>
    <div class="field is horizontal">
        <div class="field-body">
            <div class="field">
                <label class="label">Title
                    <input class="input" type="text" name="name" value="{passedData.placemark.name}">
                </label>
            </div>
            <div class="field">
                <label class="label">Description
                    <input class="input" type="text" name="description" value="{passedData.placemark.description}">
                </label>

            </div>
            <div class="field">
                <label class="label">Latitude
                    <input class="input" type="number" min="-90" max="90" name="latitude" step="0.000000000000001" value="{passedData.placemark.location.latitude}">
                </label>

            </div>
            <div class="field">
                <label class="label">Longitude
                    <input class="input" type="number" min="-180" max="180" name="longitude" step="0.000000000000001" value="{passedData.placemark.location.longitude}">
                </label>

            </div>
            <div class="field">
                <label class="label">Category
                    <div class="control">
                        <div class="select">
                            <select class="input" name="category" value="{passedData.placemark.category}">
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
                <input class="input" type="hidden" name="placemarkId" value={passedData.placemark._id}>
            </div>
        </div>
    </div>
    <button formaction="?/editPlacemark">Change Placemark</button>
</form>