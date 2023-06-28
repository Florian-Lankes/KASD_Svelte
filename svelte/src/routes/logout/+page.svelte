<<<<<<< HEAD
<script>
    import { goto } from "$app/navigation";
    import { KASDMapsService } from "../../services/KASD-Maps-service.js";
=======
<script lang="ts">
    import { goto } from "$app/navigation";
    import { KASDMapsService } from "../../services/KASD-Maps-service.ts";
>>>>>>> dev

    KASDMapsService.logout();
    goto("/");
</script>
