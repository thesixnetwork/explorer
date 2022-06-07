<template>
  <div
    class="main-menu menu-fixed menu-accordion"
    :class="[
      {
        expanded:
          !isVerticalMenuCollapsed ||
          (isVerticalMenuCollapsed && isMouseHovered)
      },
      skin === 'semi-dark' ? 'menu-dark' : 'menu-light'
    ]"
    @mouseenter="updateMouseHovered(true)"
    @mouseleave="updateMouseHovered(false)"
  >
    <!-- main menu header-->
    <div class="navbar-header expanded">
      <slot
        name="header"
        :toggleVerticalMenuActive="toggleVerticalMenuActive"
        :toggleCollapsed="toggleCollapsed"
        :collapseTogglerIcon="collapseTogglerIcon"
      >
        <ul class="nav navbar-nav flex-row">
          <!-- Logo & Text -->
          <li class="nav-item mr-auto">
            <b-link class="navbar-brand" to="/">
              <span class="brand-logo">
                <b-img :src="appLogoImage" alt="logo" />
              </span>
              <h2
                :style="{
                  background: '-webkit-linear-gradient(72deg, #353EED,#40D7FC)',
                  '-webkit-background-clip': 'text',
                  '-webkit-text-fill-color': 'transparent'
                }"
                class="brand-text"
              >
                {{ appName }}
              </h2>
              <b-badge pill variant="link" class="customizer-badge">
                <span v-if="selected_chain.chain_name == 'fivenet'">
                  Testnet
                </span>
              </b-badge>
            </b-link>
          </li>

          <!-- Toggler Button -->
          <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle">
              <feather-icon
                icon="XIcon"
                size="20"
                class="d-xl-none customizer-icon"
                @click="toggleVerticalMenuActive"
              />
            </b-link>
          </li>
        </ul>
      </slot>
    </div>
    <!-- / main menu header-->

    <!-- Shadow -->
    <div :class="{ 'd-block': shallShadowBottom }" class="shadow-bottom" />

    <!-- main menu content-->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="main-menu-content scroll-area"
      tagname="ul"
      @ps-scroll-y="
        evt => {
          shallShadowBottom = evt.srcElement.scrollTop > 0;
        }
      "
    >
      <vertical-nav-menu-items
        :items.sync="leftMenu"
        class="navigation navigation-main pl-2 pr-1"
      />
    </vue-perfect-scrollbar>
    <!-- /main menu content-->
  </div>
</template>

<script>
import navMenuItems from '@/navigation/vertical';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { BLink, BImg, BBadge } from 'bootstrap-vue';
import { provide, computed, ref } from '@vue/composition-api';
import useAppConfig from '@core/app-config/useAppConfig';
import { $themeConfig } from '@themeConfig';
import VerticalNavMenuItems from './components/vertical-nav-menu-items/VerticalNavMenuItems.vue';
import useVerticalNavMenu from './useVerticalNavMenu';

export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    BLink,
    BImg,
    BBadge
  },
  props: {
    isVerticalMenuActive: {
      type: Boolean,
      required: true
    },
    toggleVerticalMenuActive: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const {
      isMouseHovered,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      updateMouseHovered
    } = useVerticalNavMenu(props);

    const { skin } = useAppConfig();

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false);

    provide('isMouseHovered', isMouseHovered);

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false
    };

    const collapseTogglerIconFeather = computed(() =>
      collapseTogglerIcon.value === 'unpinned' ? 'CircleIcon' : 'DiscIcon'
    );

    // App Name
    const { appName, appLogoImage } = $themeConfig.app;

    return {
      navMenuItems,
      perfectScrollbarSettings,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      isMouseHovered,
      updateMouseHovered,
      collapseTogglerIconFeather,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,

      // App Name
      appName,
      appLogoImage
    };
  },
  data() {
    const chains = this.$store.state.chains.config;
    const selectChain = this.$store.state.chains.selected.chain_name;
    return {
      chains,
      selectChain
    };
  },

  computed: {
    leftMenu() {
      const preload = [];
      const { selected } = this.$store.state.chains;
      const current = navMenuItems.find(x => x.title === selected.chain_title);
      preload.push({ header: 'current' });
      preload.push(current);

      return preload.concat(
        navMenuItems.filter(
          x => x.title !== selected.chain_title && x.section == 'social'
        )
      );
      return preload;
    },
    selected_chain() {
      return this.$store.state.chains.selected;
    }
  }
};
</script>

<style lang="scss">
@import '~@core/scss/base/core/menu/menu-types/vertical-menu.scss';
@import '~@core/scss/base/components/variables-dark';

.customizer-icon {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}

.customizer-badge {
  border-radius: 8px;
  background-color: $danger;
  color: #fff;
  padding: 2px 6px;
  font-size: 8px;
  align-self: start;
}
</style>
