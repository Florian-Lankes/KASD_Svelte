<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { KASDMapsService } from "../services/KASD-Maps-service.ts";

    beforeUpdate(() => {
        KASDMapsService.reload();
    });
</script>

<div class="container">
    <slot />
</div>