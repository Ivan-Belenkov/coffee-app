<script lang="ts">
  import SVGSprite from "src/components/SVGSprite.svelte";
  import SiteHeader from "src/components/SiteHeader.svelte";
  import CoffeeTypeList from "src/components/CoffeeTypeList.svelte";
  import SiteFooter from "src/components/SiteFooter.svelte";
</script>

<SVGSprite />
<SiteHeader />
<main class="column">
  <CoffeeTypeList />
</main>
<SiteFooter />
