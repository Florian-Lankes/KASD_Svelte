<script lang="ts">
    import { goto } from "$app/navigation";
    import { KASDMapsService } from "../../services/KASD-Maps-service.ts";

    KASDMapsService.logout();
    goto("/");
</script>
