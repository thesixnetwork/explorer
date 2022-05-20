<template>
  <p class="mb-0">
    <span class="d-none d-md-block d-md-inline-block">
      Powered By
      <b-link
        class="ml-25 font-weight-bolder customizer-text"
        href="https://six.network"
        target="_blank"
      >
        SIX Network
      </b-link>
    </span>
    <router-link to="/" class="ml-auto">
      <span class="customizer-text">
        © {{ new Date().getFullYear() }} SIX Network PTE. LTD.
      </span>
    </router-link>
  </p>
</template>

<script>
import { BLink, VBPopover } from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';

export default {
  name: 'AppFooter',
  components: {
    BLink
  },
  directives: {
    'b-popover': VBPopover,
    Ripple
  }
};
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.customizer-text {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}
</style>
