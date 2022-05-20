<template>
  <b-nav-item @click="skin = isDark ? 'light' : 'dark'">
    <feather-icon
      size="21"
      :icon="`${isDark ? 'Sun' : 'Moon'}Icon`"
      class="customizer-icon"
    />
  </b-nav-item>
</template>

<script>
import useAppConfig from '@core/app-config/useAppConfig';
import { computed } from '@vue/composition-api';
import { BNavItem } from 'bootstrap-vue';

export default {
  components: {
    BNavItem
  },
  setup() {
    const { skin } = useAppConfig();

    const isDark = computed(() => skin.value === 'dark');

    return { skin, isDark };
  }
};
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.customizer-icon {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}
</style>
