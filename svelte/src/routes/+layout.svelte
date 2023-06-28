<<<<<<< HEAD
<script>
    import { beforeUpdate } from "svelte";
    import { KASDMapsService } from "../services/KASD-Maps-service.js";
=======
<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { KASDMapsService } from "../services/KASD-Maps-service.ts";
>>>>>>> dev

    beforeUpdate(() => {
        KASDMapsService.reload();
    });
</script>

<div class="container">
    <slot />
</div>
