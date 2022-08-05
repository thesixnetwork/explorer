<template>
  <b-card class="card-transaction" no-body>
    <b-card-header>
      <b-card-title>Outstanding Rewards</b-card-title>
      <!-- <feather-icon
        v-b-modal.WithdrawCommission
        icon="MoreVerticalIcon"
        size="18"
      /> -->
    </b-card-header>

    <b-card-body class="overflow-auto" style="max-height:250px;">
      <!-- Rewards -->
      <div
        v-for="d in data.self_bond_rewards"
        :key="d.amount"
        class="transaction-item mb-1"
      >
        <b-media no-body class="align-items-center">
          <b-media-aside>
            <b-avatar
              rounded
              size="42"
              variant="light-success"
              text="R"
              title="Rewards"
            />
          </b-media-aside>
          <b-media-body>
            <h6 class="transaction-title">
              {{ formatDenom(d) }}
            </h6>
          </b-media-body>
        </b-media>
        <small class="text-success d-none d-xl-block ">
          Reward
        </small>
      </div>

      <!-- Commission -->
      <div
        v-for="d in data.val_commission"
        :key="d.amount"
        class="transaction-item mb-1"
      >
        <b-media no-body class="align-items-center">
          <b-media-aside>
            <b-avatar
              rounded
              size="42"
              variant="link"
              text="C"
              title="Commission"
              class="customizer-icon"
            />
          </b-media-aside>
          <b-media-body>
            <h6 class="transaction-title">
              {{ formatDenom(d) }}
            </h6>
          </b-media-body>
        </b-media>
        <!-- <small class="customizer-text d-none d-xl-block">
          Commission
        </small> -->
      </div>
      <!-- Estimated Reward -->
      <div class="mb-50">
        <b>
          Estimated Reward
        </b>
      </div>
      <div
        v-for="d in data.val_commission"
        :key="d.amount"
        class="transaction-item mb-1"
      >
        <b-media no-body class="align-items-center">
          <b-media-aside>
            <b-avatar
              rounded
              size="42"
              variant="link"
              text="E"
              title="per block"
              class="customizer-icon"
            />
          </b-media-aside>
          <b-media-body>
            <h6 class="transaction-title">
              {{ formatDenom(d) }}
            </h6>
          </b-media-body>
        </b-media>
        <!-- <small class="customizer-text d-none d-xl-block">
          per block
        </small> -->
      </div>

      <!-- Block Validated -->
      <div class="mb-50">
        <b>
          Block Validated
        </b>
      </div>
      <div
        v-for="d in data.val_commission"
        :key="d.amount"
        class="transaction-item"
      >
        <b-media no-body class="align-items-center">
          <b-media-aside>
            <b-avatar
              rounded
              size="42"
              variant="link"
              text="B"
              title="Block"
              class="customizer-icon"
            />
          </b-media-aside>
          <b-media-body>
            <h6 class="transaction-title">
              {{ formatDenom(d) }}
            </h6>
            <!-- <small>{{ formatNumber(d.amount) }}</small> -->
          </b-media-body>
        </b-media>
        <!-- <small class="customizer-text d-none d-xl-block">
          Block
        </small> -->
      </div>
    </b-card-body>
    <!-- <b-card-body class="pt-0">
      <b-button
        v-b-modal.WithdrawCommission
        block
        size="sm"
        variant="link"
        class="customizer-button"
      >
        Withdraw Commission
      </b-button>
    </b-card-body> -->
    <operation-modal
      type="WithdrawCommission"
      modal-id="WithdrawCommission"
      :validator-address="validator"
      :address="address"
    />
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BMediaBody,
  BMedia,
  BMediaAside,
  BAvatar
  // BButton
} from 'bootstrap-vue';
import { sha256 } from '@cosmjs/crypto';
import { toHex } from '@cosmjs/encoding';
import { formatToken, numberWithCommas } from '@/libs/utils';
import OperationModal from '@/views/components/OperationModal/index.vue';

export default {
  components: {
    // BButton,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    // eslint-disable-next-line vue/no-unused-components
    OperationModal
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    validator: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    denoms() {
      console.log('this.$store.state.chains.denoms', this.$store.state);
      return this.$store.state.chains.denoms;
    }
  },
  methods: {
    formatNumber(value) {
      if (value < 1) return value;
      // eslint-disable-next-line no-undef
      return numberWithCommas(BigInt(Number(value).toFixed(0)));
    },
    formatDenom(value) {
      return formatToken(value, this.denoms, 2);
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

  .dark-layout & {
    background-color: $primary;
    color: #fff;
  }
}

.customizer-text {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}

.customizer-icon {
  color: $info;
  background-color: rgba($info, 0.12);

  .dark-layout & {
    color: $primary;
    background-color: rgba($primary, 0.12);
  }
}
</style>
