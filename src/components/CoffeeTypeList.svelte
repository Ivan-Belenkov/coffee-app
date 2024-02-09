<script lang="ts">
  import { slide } from "svelte/transition";
  import { MAX_COUNT } from "src/services/CoffeeTypeService";
  import AsyncLoader from "src/components/AsyncLoader.svelte";
  import LoadMoreBtn from "src/components/LoadMoreBtn.svelte";
  import { get, SERVICE_TYPES } from "src/container/container";
  import CoffeeTypeCard from "src/components/CoffeeTypeCard.svelte";
  import type { ICoffeeTypeService } from "src/container/interfaces";

  const SLIDE_IN_DURATION = 200;
  const slideInSettings = {
    duration: SLIDE_IN_DURATION,
  };

  const CoffeeTypeService = get<ICoffeeTypeService>(SERVICE_TYPES.CoffeeTypeService);

  let list = CoffeeTypeService.getList();
  let loadingState = CoffeeTypeService.getLoadingState();
  let promise = CoffeeTypeService.load();

  let btnRef: HTMLElement;
  list.subscribe(() => btnRef && setTimeout(() => btnRef?.scrollIntoView({ behavior: "smooth", block: "end" }), SLIDE_IN_DURATION));
</script>

<AsyncLoader {promise}>
  <h1>Welcome to&nbsp;the Coffee World</h1>
  <ul class="list">
    {#each $list as item (item.uid)}
      <li in:slide={slideInSettings}
          class="list__item"
      >
        <CoffeeTypeCard coffeeType={item} />
      </li>
    {/each}
  </ul>
  <div class="button-holder" bind:this={btnRef}>
    <LoadMoreBtn disabled={$list.length >= MAX_COUNT} />
    {#if $loadingState.error}
      <p class="error button-holder__error">Sorry, something went wrong!</p>
    {/if}
  </div>
</AsyncLoader>

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
    &__error {
      margin-top: 1em;
    }
  }
</style>
