<script>
    import Chart from "svelte-frappe-charts";

    let data = {
        labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        datasets: [
            {
                values: [10, 12, 3, 9, 8, 15, 9]
            }
        ]
    };

    let data2 = {
        labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"], // aktuelles Datum
        datasets: [
            {
                values: [10, 12, 3, 9, 8, 15, 9] // users.anzahl()
            }
        ]
    };

</script>

<div class="columns">
    <div class="column box m-4">
        <h1 class="title is-4">Users to date</h1>
        <Chart {data} type="line" />
    </div>
    <div class="column box m-4">
        <h1 class="title is-4">User activity</h1>
        <Chart {data} type="line" />
    </div>
</div>
