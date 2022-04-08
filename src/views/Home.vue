<template>
  <div class="text-center container-lg my-1">
    <b-nav
      align="right"
      style="width:100%;"
      class="nav text-right text-nowrap ml-auto"
    >
      <b-nav-item><dark-toggler /></b-nav-item>
      <!-- <b-nav-item><locale /></b-nav-item> -->
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="link"
        class="btn-icon mt-20 d-flex justify-content-center align-items-center customizer-button"
        :to="`/fivenet`"
      >
        <span class="align-middle mr-25">Connect Wallet</span>
        <feather-icon icon="UnlockIcon" />
      </b-button>
    </b-nav>
    <b-link>
      <div class="d-flex justify-content-center align-items-center mt-2">
        <h1
          :style="{
            background: '-webkit-linear-gradient(72deg, #353EED,#40D7FC)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent'
          }"
          class="brand-text display-4 font-weight-bolder d-md-block"
        >
          SIX Scan<small class="flow-left">Beta</small>
        </h1>
      </div>
    </b-link>

    <p class="mb-1">
      <b>SIX PROTOCOL</b> explorer is not just an explorer but also a wallet and
      more ... 🛠
    </p>
    <h2 class="mb-3">
      SIX Protocol Ecosystem 🚀
    </h2>

    <div>
      <b-row align-h="center" class="match-height">
        <b-col v-for="(data, index) in chains" :key="index" md="3" sm="6">
          <router-link :to="data.chain_name">
            <b-card v-if="data" class="earnings-card text-left">
              <div>
                <b-card-title class="mb-1 text-uppercase">
                  {{ data.chain_title }}
                  <small class="font-small-2">{{ data.sdk_version }}</small>
                </b-card-title>

                <div class="d-flex justify-content-between">
                  <div>
                    <div class="font-small-2 customizer-text">
                      Height
                    </div>
                    <h5 class="mb-1">
                      {{ data.height || '0' }}
                    </h5>
                  </div>
                  <div>
                    <b-avatar
                      :src="data.logo"
                      class="badge-minimal"
                      variant="light-primary"
                      rounded
                      size="md"
                      badge
                      :badge-variant="data.variant"
                    />
                  </div>
                </div>
                <b-card-text class="text-muted font-small-2">
                  <span> Updated on </span>
                  <span class="font-weight-bolder">{{
                    data.time || '...'
                  }}</span>
                </b-card-text>
              </div>
            </b-card>
          </router-link>
        </b-col>

        <!-- no result found -->
        <b-col v-show="!chains" cols="12" class="text-center">
          <h4 class="mt-4">
            No blockchain found!!
          </h4>
        </b-col>
        <!--/ no result found -->
      </b-row>
    </div>
    <app-footer class="mb-1" />
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BLink,
  BAvatar,
  BRow,
  BCol,
  BCard,
  BCardText,
  BCardTitle,
  BNav,
  BNavItem,
  BButton
} from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import store from '@/store/index';
import { getLocalAccounts, timeIn, toDay } from '@/libs/utils';
import DarkToggler from '@/@core/layouts/components/app-navbar/components/DarkToggler.vue';
// import Locale from '@/@core/layouts/components/app-navbar/components/Locale.vue'
import AppFooter from '@/@core/layouts/components/AppFooter.vue';

export default {
  components: {
    BLink,
    BAvatar,
    BRow,
    BCol,
    BCard,
    BCardText,
    BCardTitle,
    BNav,
    BNavItem,
    BButton,
    DarkToggler,
    // Locale,
    AppFooter
  },
  directives: {
    Ripple
  },
  data() {
    const chains = this.$store.state.chains.config;
    return {
      chains,
      downImg: require('@/assets/images/pages/under-maintenance.svg')
    };
  },
  computed: {
    walletName() {
      const key = this.$store?.state?.chains?.defaultWallet;
      return key || 'Wallet';
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/under-maintenance-dark.svg');
        return this.downImg;
      }
      return this.downImg;
    }
  },
  created() {
    this.fetch();
    this.timer = setInterval(this.fetch, 120000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    const accounts = Object.keys(getLocalAccounts() || {});
    if (!this.$store.state.chains.defaultWallet && accounts.length > 0) {
      this.$store.commit('setDefaultWallet', accounts[0]);
    }
  },
  methods: {
    fetch() {
      Object.keys(this.chains).forEach(k => {
        const chain = this.chains[k];
        const index =
          localStorage.getItem(`${chain.chain_name}-api-index`) || 0;
        if (chain.api) {
          const host = Array.isArray(chain.api) ? chain.api[index] : chain.api;
          fetch(`${host}/blocks/latest`)
            .then(res => res.json())
            .then(b => {
              // console.log(b.block.header)
              const { header } = b.block;
              this.$set(chain, 'height', header.height);
              this.$set(chain, 'time', toDay(header.time));
              this.$set(
                chain,
                'variant',
                timeIn(header.time, 3, 'm') ? 'danger' : 'success'
              );
            });
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
  border-radius: 12px;
  background-color: #002770;
  color: #fff;

  .dark-layout & {
    background-color: #40d7fc;
    color: #fff;
  }

  @include media-breakpoint-down(xs) {
    padding: 6px 10px;
    margin-top: 4px;
    border-radius: 10px;

    span {
      font-size: 0.8rem;
    }
  }
}

.customizer-text {
  color: #002770;

  .dark-layout & {
    color: #40d7fc;
  }
}
</style>
