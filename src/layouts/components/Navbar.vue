<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-flex">
      <b-media v-if="selected_chain" no-body class="flex align-center">
        <b-media-aside class="mr-75">
          <b-link
            class="nav-link"
            style="padding: 0"
            @click="toggleVerticalMenuActive"
          >
            <b-avatar
              v-b-tooltip.hover.bottom="tips"
              variant="transparent"
              badge
              rounded
              size="42"
              :src="selected_chain.logo"
              class="badge-minimal d-none d-xl-block"
              :badge-variant="variant"
            />
            <feather-icon
              icon="MenuIcon"
              size="22"
              class="cursor-pointer customizer-icon  d-xs-block d-sm-block d-md-block d-lg-block d-xl-none"
            />
          </b-link>
        </b-media-aside>
        <b-media-body>
          <h3 class="c-mb-0">
            <span class="text-uppercase">
              {{ chainid || selected_chain.chain_title }}
            </span>
          </h3>
          <small
            id="data-provider"
            class="flex align-center d-none d-md-block d-md-inline-block"
          >
            {{ currentApi }} ({{ selected_chain.sdk_version || '-' }})&nbsp;
            <b-dropdown
              class="ml-0"
              variant="flat-primary"
              no-caret
              toggle-class="p-0"
              right
              sm
            >
              <template #button-content>
                <feather-icon
                  icon="RepeatIcon"
                  size="12"
                  class="cursor-pointer customizer-icon"
                />
              </template>
              <b-dropdown-item
                v-for="(item, i) in apiOptions"
                :key="item"
                class="customizer-items"
                @click="change(i)"
              >
                {{ item }}
              </b-dropdown-item>
            </b-dropdown>
          </small>
        </b-media-body>
      </b-media>
    </div>
    <!-- Right Col -->
    <b-navbar-nav class="nav align-items-center ml-auto justify-content-end">
      <dark-Toggler />
      <search-bar />
      <!-- <locale /> -->
      <b-dropdown
        class="c-ml-1"
        variant="link"
        no-caret
        toggle-class="p-0"
        right
      >
        <template #button-content>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="link"
            class="customizer-button d-flex justify-content-center align-items-center"
          >
            <feather-icon icon="UserIcon" />
            <span class="align-middle ml-25">{{ walletName }}</span>
          </b-button>
        </template>

        <b-dropdown-item
          v-for="(item, k) in accounts"
          :key="k"
          :disabled="!item.address"
          :to="`/${selected_chain.chain_name}/account/${item.address.addr}`"
          class="customizer-items"
          @click="updateDefaultWallet(item.wallet)"
        >
          <div class="d-flex flex-column">
            <span class="font-weight-bolder">
              {{ item.wallet }}
              <b-avatar
                v-if="item.wallet === walletName"
                variant="success"
                size="sm"
                class="mr-5"
              >
                <feather-icon icon="UserCheckIcon" size="12" />
              </b-avatar>
            </span>
            <small>
              {{
                item.address
                  ? formatAddr(item.address.addr)
                  : `Not available on ${selected_chain.chain_name}`
              }}
            </small>
          </div>
        </b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item to="/wallet/import" class="customizer-items">
          <feather-icon icon="PlusIcon" size="16" />
          <span class="align-middle ml-50">Import Address</span>
        </b-dropdown-item>
        <b-dropdown-divider />

        <b-dropdown-item :to="{ name: 'accounts' }" class="customizer-items">
          <feather-icon icon="KeyIcon" size="16" />
          <span class="align-middle ml-50">Accounts</span>
        </b-dropdown-item>

        <b-dropdown-item :to="{ name: 'delegations' }" class="customizer-items">
          <feather-icon icon="BookOpenIcon" size="16" />
          <span class="align-middle ml-50">My Delegations</span>
        </b-dropdown-item>

        <b-dropdown-item
          :to="`/${selected_chain.chain_name}/uptime/my`"
          class="customizer-items"
        >
          <feather-icon icon="AirplayIcon" size="16" />
          <span class="align-middle ml-50">My Validators</span>
        </b-dropdown-item>
        <b-dropdown-item :to="`/wallet/transactions`" class="customizer-items">
          <feather-icon icon="LayersIcon" size="16" />
          <span class="align-middle ml-50">My Transactions</span>
        </b-dropdown-item>
      </b-dropdown>
      <!-- select chain -->
      <b-dropdown
        class="c-ml-1"
        variant="link"
        no-caret
        toggle-class="p-0"
        right
      >
        <template #button-content>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="link"
            class="customizer-button d-flex justify-content-center align-items-center"
          >
            <feather-icon icon="RssIcon" />
          </b-button>
        </template>
        <b-dropdown-item :to="'fivenet'" class="customizer-items">
          <span class="align-middle ml-50">Testnet</span>
        </b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item :to="'sixnet'" class="customizer-items">
          <span class="align-middle ml-50">Mainnet</span>
        </b-dropdown-item>
      </b-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
  VBTooltip,
  BButton,
  BDropdown,
  BDropdownItem,
  BDropdownDivider
} from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue';
// import Locale from '@core/layouts/components/app-navbar/components/Locale.vue'
import SearchBar from '@core/layouts/components/app-navbar/components/SearchBar.vue';
// import CartDropdown from '@core/layouts/components/app-navbar/components/CartDropdown.vue'
import { getLocalAccounts, timeIn, toDay } from '@/libs/utils';
// import UserDropdown from '@core/layouts/components/app-navbar/components/UserDropdown.vue'

export default {
  components: {
    BLink,
    BNavbarNav,
    BAvatar,
    BMedia,
    BMediaAside,
    BMediaBody,
    BButton,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,

    // Navbar Components
    DarkToggler,
    // Locale,
    SearchBar
    // CartDropdown,
    // UserDropdown,
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      variant: 'success',
      tips: 'Synced',
      index: 0,
      chainid: ''
    };
  },
  computed: {
    walletName() {
      const key = this.$store?.state?.chains?.defaultWallet;
      return key || 'Wallet';
    },
    selected_chain() {
      this.block();
      return this.$store.state.chains.selected;
    },
    chainVariant() {
      return this.variant;
    },
    currentApi() {
      return this.index + 1 > this.apiOptions.length
        ? this.apiOptions[0]
        : this.apiOptions[this.index];
    },
    apiOptions() {
      const conf = this.$store.state.chains.selected;
      if (Array.isArray(conf.api)) {
        return conf.api;
      }
      return [conf.api];
    },
    accounts() {
      let accounts = getLocalAccounts() || {};
      accounts = Object.entries(accounts).map(v => ({
        wallet: v[0],
        address: v[1].address.find(
          x => x.chain === this.selected_chain.chain_name
        )
      }));

      if (accounts.length > 0) {
        this.updateDefaultWallet(accounts[0].wallet);
      }
      return accounts.filter(x => x.address);
    }
  },
  mounted() {},
  methods: {
    formatAddr(v) {
      return v.substring(0, 10).concat('...', v.substring(v.length - 10));
    },
    updateDefaultWallet(v) {
      this.$store.commit('setDefaultWallet', v);
    },
    change(v) {
      this.index = v;
      const conf = this.$store.state.chains.selected;
      localStorage.setItem(`${conf.chain_name}-api-index`, v);
      window.location.reload();
    },
    block() {
      const conf = this.$store.state.chains.selected;
      const s = localStorage.getItem(`${conf.chain_name}-api-index`) || 0;
      this.index = Number(s);
      this.$store.commit('setHeight', 0);
      this.$http.getLatestBlock().then(block => {
        this.chainid = block.block.header.chain_id;
        this.$store.commit('setHeight', Number(block.block.header.height));
        if (timeIn(block.block.header.time, 1, 'm')) {
          this.variant = 'danger';
          this.tips = `Halted ${toDay(
            block.block.header.time,
            'from'
          )}, Height: ${this.$store.state.chains.height} `;
        } else {
          this.variant = 'success';
          this.tips = 'Synced';
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.customizer-button {
  background-color: $info;
  color: #fff;
  border-radius: 12px;

  .dark-layout & {
    background-color: $primary;
  }

  @include media-breakpoint-down(xs) {
    padding: 6px 10px;
    margin-top: 4px;
    border-radius: 10px;

    span {
      font-size: 0.9rem;
    }
  }
}

h3 {
  @include media-breakpoint-down(xs) {
    font-size: 1.2rem;
  }
}

.customizer-icon {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}

.customizer-items :hover {
  color: $info;
  background-color: rbga($info, 0.12);

  .dark-layout & {
    color: #fff;
    background-color: rbga($primary, 0.12);
  }
}
</style>
