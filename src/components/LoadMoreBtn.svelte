<button class="load-more-btn load-more-btn--loading"
        title="Load more">
  <span class="visually-hidden">Load more</span>
</button>

<style lang="less">
  @import "src/styles/variables";
  .load-more-btn {
    appearance: none;
    border: none;
    font: inherit;
    margin: 0;
    padding: 0;
    cursor: pointer;
    outline: none;
    font-size: 5em;
    font-weight: 300;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    background: @color_coffee_dark;
    color: @color_coffee_light;
    border-radius: 50%;
    &:not(:disabled, .load-more-btn--loading) {
      transition: font-size .25s linear,
      background-color .25s linear;
      &:hover,
      &:focus {
        font-size: 6em;
        background-color: lighten(@color_coffee_dark, 10%);
      }
    }
    &:before {
      content: '+';
    }
    &:disabled,
    &--loading {
      background-color: darken(@color_coffee_dark, 5%);
      cursor: default;
    }
    &--loading:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 40px;
      padding: 8px;
      aspect-ratio: 1;
      border-radius: 50%;
      background: @color_coffee_light;
      mask: conic-gradient(#0000 10%,#000),
      linear-gradient(#000 0 0) content-box;
      mask-composite: subtract;
      animation: rotation 1s infinite linear;
    }
  }
  @keyframes rotation {
    to {
      transform: rotate(1turn)
    }
  }
</style>
