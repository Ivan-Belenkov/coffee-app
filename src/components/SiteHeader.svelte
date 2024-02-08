<header class="site-header">
  <div class="column site-header__inner">
    <a href="#nonexistent" class="logo" title="Home page">
      <svg class="logo__img">
        <use xlink:href="#logo"></use>
      </svg>
      <span class="logo__text">Coffee World</span>
    </a>
  </div>
</header>

<style lang="less">
  @import "src/styles/variables";
  .site-header {
    box-shadow: 0 2px 5px rgba(@color_black, .5);
    background: @color_coffee;
    &__inner {
      padding: 10px 0;
      text-align: center;
    }
  }
  .logo {
    font-family: @ff_logo;
    color: @color_coffee_dark;
    display: inline-flex;
    align-items: end;
    text-decoration: none;
    &__img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
      fill: @color_coffee_dark;
      flex: none;
      @media (min-width: 601px) {
        width: 90px;
        height: 90px;
      }
    }
    &__text {
      font-size: 36px;
      margin-bottom: 8px;
      @media (min-width: 601px) {
        font-size: 48px;
      }
    }
  }
</style>
