<script>
    import TitleBar from './TitleBar.svelte';
</script>

<div class="columns is-vcentered">
    <div class="column is-half">
        <TitleBar title={'KASD Maps Service'} subTitle={''} />
    </div>
    <div class="column is-half">
        <slot />
    </div>
</div>