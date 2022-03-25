<template>
  <p class="mb-0">
    <span class="d-none d-md-block d-md-inline-block">
      Powered By
      <b-link 
        class="ml-25 font-weight-bolder" 
        href="https://d1cqbqg81wqd4z.cloudfront.net/" 
        target="_blank"
      >
        SIX PROTOCOL
      </b-link>
    </span>
    <router-link
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      to="/"
      class="ml-auto"
    >
      <span
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="outline-primary"
      >
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
