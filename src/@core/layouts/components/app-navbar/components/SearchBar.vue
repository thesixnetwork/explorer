<template>
  <li class="nav-item nav-search customizer-li">
    <!-- Icon -->
    <!-- <a
      href="javascript:void(0)"
      class="nav-link nav-link-search d-xs-block d-sm-block d-md-block d-lg-block d-xl-none"
      @click="showSearchBar = true"
    >
      <feather-icon icon="SearchIcon" size="21" class="customizer-icon" />
    </a> -->

    <!-- Input -->
    <div
      class="search-input customizer-search my-50"
      :class="{ open: showSearchBar }"
    >
      <div class="search-input-icon customizer-search-icon">
        <feather-icon icon="SearchIcon" />
      </div>

      <b-form-input
        v-if="showSearchBar"
        v-model="searchQuery"
        placeholder="Search Height/Transaction/Address"
        class="customizer-input"
        autofocus
        autocomplete="off"
        @keyup.enter="doQuery"
        @keyup.esc="escPressed"
      />
    </div>
  </li>
</template>

<script>
import { BFormInput } from 'bootstrap-vue';
import { ref } from '@vue/composition-api';
import { title } from '@core/utils/filter';
import store from '@/store';

export default {
  components: {
    BFormInput
  },
  setup() {
    const showSearchBar = ref(true);

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60
    };

    return {
      showSearchBar,
      perfectScrollbarSettings,
      title
    };
  },
  data() {
    return {
      searchQuery: null
    };
  },
  methods: {
    doQuery() {
      const height = /^\d+$/;
      const txhash = /^[A-Z\d]{64}$/;
      const addr = /^[a-z\d]{2,6}1[a-z\d]{38}$/;
      const key = this.searchQuery;

      const c = store.state.chains.selected;
      if (!Object.values(this.$route.params).includes(key)) {
        if (height.test(key)) {
          this.$router.push({
            name: 'block',
            params: { chain: c.chain_name, height: key }
          });
        } else if (txhash.test(key)) {
          this.$router.push({
            name: 'transaction',
            params: { chain: c.chain_name, hash: key }
          });
        } else if (addr.test(key)) {
          this.$router.push({
            name: 'chain-account',
            params: { chain: c.chain_name, address: key }
          });
        }
      }
      // this.$router.push('/')
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
p {
  margin: 0;
}

/* .app-auto-suggest {
  position: relative;
}

.auto-suggest-suggestions-list {
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  border-radius: 6px;
  position: absolute;
  top: calc(100% + 1rem);
  background-color: white;
  width: 100%;
} */

.suggestion-group-title {
  font-weight: 500;
  padding: 0.75rem 1rem 0.25rem;
}

.suggestion-group-suggestion {
  padding: 0.75rem 1rem;
}

.suggestion-current-selected {
  background-color: $body-bg;

  .dark-layout & {
    background-color: $theme-dark-body-bg;
  }
}

.customizer-icon {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}

.customizer-search-icon {
  top: 22% !important;
}
.customizer-li {
  width: 50%;
  @include media-breakpoint-only(sm) {
    width: 65%;
  }
  @include media-breakpoint-down(xs) {
    width: 100%;
  }
}

.customizer-input {
  padding: 1rem 3.6rem !important;
}

.customizer-search {
  position: relative !important;
}
</style>
