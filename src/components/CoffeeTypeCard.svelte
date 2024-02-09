<script lang="ts">
  import TagList from "src/components/TagList.svelte";
  import type { CoffeeType } from "src/store/types";

  export let coffeeType: CoffeeType;
  let { blendName, origin, variety, intensifier, tags, imageUrl } = coffeeType;
</script>

<article class="card">
  <div class="card__cover card__no-pe">
    <img class="card__pic card__no-pe" src={imageUrl} alt={blendName}>
  </div>
  <div class="card__body card__no-pe">
    <h1 class="card__header card__no-pe">
      <a class="card__link" href="#nonexistent">{blendName}</a>
    </h1>
    <p class="card__origin card__no-pe text-trim">{origin}</p>
    <p class="card__variety card__no-pe">{variety}</p>
    <p class="card__intensifier card__no-pe text-trim">{intensifier}</p>
    <div class="card__tags">
      <TagList tagList={tags} />
    </div>
  </div>
</article>

<style lang="less">
  @import "src/styles/variables";
  .card {
    position: relative;
    background-color: @color_white;
    box-shadow: 0 2px 5px rgba(@color_black, .5);
    z-index: 0;
    @media (min-width: 601px) {
      display: flex;
    }
    &__no-pe {
      pointer-events: none;
    }
    &__cover {
      overflow: hidden;
      aspect-ratio: 16/9;
      @media (min-width: 601px) {
        width: 33%;
        flex: none;
        aspect-ratio: 1/1;
      }
    }
    &__pic {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1);
      transition: transform .25s linear;
    }
    &__body {
      padding: .8em;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: @mobile_column_width;
      min-width: @mobile_column_min_width;
      @media (min-width: 601px) {
        flex: auto;
        min-width: 0;
        width: auto;
      }
    }
    &__header {
      font-size: 1.8em;
      margin: 0 0 .5em;
    }
    &__link {
      pointer-events: all;
      color: @color_coffee_dark;
      text-decoration: none;
      &:hover,
      &:focus {
        text-decoration: underline;
      }
      &:focus {
        outline: none;
      }
      &:before {
        position: absolute;
        content: '';
        inset: 0;
        z-index: -1;
      }
    }
    &__origin {
      order: -1;
      margin: 0 0 .5em;
      font-style: italic;
      color: @color_mute;
    }
    &__variety {
      margin: 0 0 1em;
    }
    &__intensifier {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      padding: .3em .8em;
      text-align: right;
      color: @color_white;
      background-color: rgba(@color_coffee_dark, .5);
      @media (min-width: 601px) {
        width: 33%;
      }
    }
    &__tags {
      pointer-events: all;
      overflow: auto;
      margin-top: auto;
    }
    &:has(.card__link:hover, .card__link:focus) {
      .card__pic {
        transform: scale(1.2);
      }
    }
  }
</style>
