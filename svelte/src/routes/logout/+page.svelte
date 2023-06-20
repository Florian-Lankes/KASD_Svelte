<script>
    import { goto } from "$app/navigation";
    import { KASDMapsService } from "../../services/KASD-Maps-service.js";

    KASDMapsService.logout();
    goto("/");
</script>
