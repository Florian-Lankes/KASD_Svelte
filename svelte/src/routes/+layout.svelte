<script>
    import { beforeUpdate } from "svelte";
    import { KASDMapsService } from "../services/KASD-Maps-service.js";

    beforeUpdate(() => {
        KASDMapsService.reload();
    });
</script>

<div class="container">
    <slot />
</div>
