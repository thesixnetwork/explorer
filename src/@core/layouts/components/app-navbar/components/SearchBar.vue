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
    <div>
      <b-input-group>
        <template #prepend>
          <b-input-group-text>
            <div class="search-input-icon customizer-search-icon">
              <feather-icon icon="SearchIcon" />
            </div>
          </b-input-group-text>
        </template>
        <b-form-input
          v-if="showSearchBar"
          v-model="searchQuery"
          placeholder="Search Height/Transaction/Address/Schema code"
          autofocus
          autocomplete="off"
          @keyup.enter="doQuery"
          @keyup.esc="escPressed"
        />

        <template #append>
          <b-dropdown
            :text="selectedItem"
            variant="primary"
            v-model="selectedItem"
          >
            <b-dropdown-item
              id="Height"
              @click="selectedItem = 'Height'"
              class="text-dropdown"
            >
              Height
            </b-dropdown-item>
            <b-dropdown-item
              id="Transaction"
              @click="selectedItem = 'Transaction'"
            >
              Transaction
            </b-dropdown-item>
            <b-dropdown-item id="Address" @click="selectedItem = 'Address'">
              Address
            </b-dropdown-item>
            <b-dropdown-item
              id="Schema code"
              @click="selectedItem = 'Schema code'"
            >
              Schema code
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-input-group>
    </div>
    <!-- <div
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
    </div>-->
  </li>
</template>

<script>
import {
  BFormInput,
  BInputGroup,
  BInputGroupText,
  BDropdown,
  BDropdownItem
} from 'bootstrap-vue';
import { ref } from '@vue/composition-api';
import { title } from '@core/utils/filter';
import store from '@/store';

export default {
  components: {
    BFormInput,
    BInputGroup,
    BInputGroupText,
    BDropdown,
    BDropdownItem
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
      searchQuery: null,
      options: [
        { text: 'Option1', value: 1 },
        { text: 'Option2', value: 2 },
        { text: 'Option3', value: 3 },
        { text: 'Option4', value: 4 }
      ],
      selectedItem: 'Filter'
    };
  },
  methods: {
    doSomething(v) {
      console.log('log v', v);
    },
    doQuery() {
      const height = /^\d+$/;
      const txhash = /^[A-Z\d]{64}$/;
      const addr = /^[a-z\d]{2,6}1[a-z\d]{38}$/;
      const key = this.searchQuery;
      const item = this.selectedItem;

      const c = store.state.chains.selected;
      if (!Object.values(this.$route.params).includes(key)) {
        if (item === 'Height' && height.test(key)) {
          this.$router.push({
            name: 'block',
            params: { chain: c.chain_name, height: key }
          });
        } else if (item === 'Transaction' && txhash.test(key)) {
          this.$router.push({
            name: 'transaction',
            params: { chain: c.chain_name, hash: key }
          });
        } else if (item === 'Address' && addr.test(key)) {
          this.$router.push({
            name: 'chain-account',
            params: { chain: c.chain_name, address: key }
          });
        } else if (item === 'Schema code') {
          this.$router.push({
            name: 'gen2TxnSeach',
            params: { chain: c.chain_name, address: key, tokenCode: key }
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
  width: 40%;
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

.bg-dropdown {
  background: $info;
  color: #fff;
}

.text-dropdown {
  color: #fff;

  .dark-layout & {
    color: $primary;
  }
}
</style>
