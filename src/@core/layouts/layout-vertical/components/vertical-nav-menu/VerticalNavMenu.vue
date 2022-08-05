<template>
  <div
    class="main-menu menu-fixed menu-accordion menu-shadow"
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
            <b-link class="navbar-brand position-relative" to="/">
              <span class="brand-logo">
                <b-img :src="appLogoImage" alt="logo" fluid />
              </span>

              <h2 class="brand-text customizer-text">
                {{ appName }}
                <div class="customizer-div">
                  <span class="customizer-text-desc">
                    SIX Protocol block explorer
                  </span>
                </div>
              </h2>
              <b-badge
                v-if="selected_chain.chain_name == 'fivenet'"
                variant="danger"
                text-indicator
                class="customizer-badge"
              >
                Testnet
              </b-badge>
            </b-link>
          </li>

          <!-- Toggler Button -->
          <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle">
              <!-- <feather-icon
                icon="XIcon"
                size="20"
                class="d-block d-xl-none"
                @click="toggleVerticalMenuActive"
              /> -->
              <feather-icon
                :icon="collapseTogglerIconFeather"
                size="20"
                class="d-none d-xl-block collapse-toggle-icon"
                @click="toggleCollapsed"
              />
            </b-link>
          </li>
          <!-- <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle">
              <feather-icon
                icon="XIcon"
                size="20"
                class="d-xl-none customizer-icon"
                @click="toggleVerticalMenuActive"
              />
            </b-link>
          </li> -->
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
        class="navigation navigation-main pl-1 pr-1"
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
  color: #fff;
  padding: 2px 6px;
  font-size: 8px;
  align-self: start;
  position: absolute;
  margin-left: 150px;
}

.customizer-div {
  line-height: 0.6rem;
}

.customizer-text-desc {
  font-size: 10px;
  color: #40404180 !important;
  .dark-layout & {
    color: #ffffff80 !important;
  }
}

.customizer-text {
  color: $info !important;

  .dark-layout & {
    color: $primary !important;
  }
}
</style>
