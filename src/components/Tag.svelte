<script lang="ts">
  export let tagContent;
</script>

<div class="tag">
  <b>{tagContent}</b>
</div>

<style lang="less">
  @import "src/styles/variables";
  :root {
    --bg-color: @color_coffee_dark;
  }
  .tag {
    color: @color_white;
    background-color: var(--bg-color);
    padding: .2em .3em;
    white-space: nowrap;
    text-shadow: 0 0 1px @color_black;
  }
</style>
