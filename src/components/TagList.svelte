<script lang="ts">
  import Tag from "src/components/Tag.svelte";
</script>

<ul class="tag-list">
  {#each ["crisp", "coating", "black-tea", "peanut"] as tag }
    <li>
      <Tag tagContent={tag} />
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
