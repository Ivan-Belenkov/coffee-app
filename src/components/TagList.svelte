<script lang="ts">
  import Tag from "src/components/Tag.svelte";
  import type { CoffeeTag } from "src/store/types";

  export let tagList: CoffeeTag[]
</script>

<ul class="tag-list">
  {#each tagList as tag (tag.id) }
    <li>
      <Tag
        tagContent={tag.text}
        --bg-color="{tag.color}"
      />
    </li>
  {/each}
</ul>

<style lang="less">
  .tag-list {
    display: flex;
    list-style: none;
    padding: .2em 0;
    gap: .2em;
  }
</style>
