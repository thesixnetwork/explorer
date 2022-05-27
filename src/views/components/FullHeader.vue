<template>
  <b-nav
    align="right"
    style="width:100%"
    class="nav text-right text-nowrap ml-auto"
  >
    <b-nav-item><dark-toggler /></b-nav-item>
    <b-button
      variant="link"
      class="d-flex
        justify-content-center align-items-center customizer-button"
      :to="{ name: 'accounts' }"
    >
      <feather-icon icon="KeyIcon" size="14" />
      <span class="align-middle ml-25">Wallet</span>
    </b-button>
  </b-nav>
</template>

<script>
import { BNav, BNavItem, BButton } from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import DarkToggler from '@/@core/layouts/components/app-navbar/components/DarkToggler.vue';
// import Locale from '@/@core/layouts/components/app-navbar/components/Locale.vue';

export default {
  components: {
    BNav,
    BNavItem,
    BButton,
    DarkToggler
    // Locale
  },
  directives: {
    Ripple
  }
};
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.customizer-button {
  border-radius: 12px;
  background-color: $info;
  color: #fff;
  margin: 4px 0px;

  .dark-layout & {
    background-color: $primary;
    color: #fff;
  }

  @include media-breakpoint-down(xs) {
    padding: 0.486rem 1rem !important;
    border-radius: 10px;
    margin: 6px 0px;

    span {
      font-size: 0.9rem;
    }
  }
}
</style>
