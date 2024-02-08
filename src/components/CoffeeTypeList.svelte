<script lang="ts">
  import CoffeeTypeCard from "src/components/CoffeeTypeCard.svelte";
  import LoadMoreBtn from "src/components/LoadMoreBtn.svelte";
</script>

<h1>Welcome to&nbsp;the Coffee World</h1>
<ul class="list">
  {#each [1] as item}
  <li class="list__item">
    <CoffeeTypeCard {item} />
  </li>
  {/each}
</ul>
<div class="button-holder">
  <LoadMoreBtn />
</div>

<style lang="less">
  @import "src/styles/variables";
  h1 {
    text-align: center;
    color: @color_coffee_dark;
  }
  .list {
    list-style: none;
    padding: 0;
    &__item + &__item {
      margin-top: 1.5em;
    }
  }
  .button-holder {
    margin-top: 1em;
    padding: 1em 0;
    text-align: center;
  }
</style>
