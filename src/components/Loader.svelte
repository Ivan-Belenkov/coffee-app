<div class="loader">
  <svg class="loader__img">
    <use xlink:href="#logo"></use>
  </svg>
</div>

<style lang="less">
  @import "src/styles/variables";
  :root {
    --loader-color: @color_coffee_dark;
  }
  .loader {
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    align-content: center;
    &__img {
      fill: var(--loader-color);
      animation: pulse 2s infinite ease;
    }
    @keyframes pulse {
      0% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.5;
      }
    }
  }
</style>
