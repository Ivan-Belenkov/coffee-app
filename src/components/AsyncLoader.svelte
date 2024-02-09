<script lang="ts">
  import Loader from "src/components/Loader.svelte";

  export let promise
</script>

{#await promise}
  <Loader />
{:then value }
  <slot {value} />
{:catch error}
  <slot name="error" {error}>
    <p class="error">Sorry, something went wrong!</p>
  </slot>
{/await}
