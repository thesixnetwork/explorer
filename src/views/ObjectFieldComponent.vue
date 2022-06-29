<template>
  <b-table-simple
    v-if="typeof tablefield === 'object'"
    hover
    :small="small"
    striped
    stacked="sm"
    responsive="sm"
  >
    <b-tbody>
      <b-tr v-for="(value, name) in tablefield" :key="name">
        <b-td style="text-transform: capitalize; vertical-align: top;">
          {{ name.replaceAll('_', ' ') }}
        </b-td>
        <b-td v-if="isTokenField(value)">
          {{ formatTokens(value) }}
        </b-td>
        <b-td v-else-if="isArrayText(value)">
          {{ value.join(', ') }}
        </b-td>
        <b-td v-else-if="isHex(value)">
          {{ formatHexAddress(value) }}
        </b-td>
        <b-td v-else-if="Array.isArray(value)">
          <array-field-component :tablefield="value" />
        </b-td>
        <b-td
          v-else-if="typeof value === 'object'"
          hover
          class="overflow-hidden"
        >
          <b-td :v-if="Object.keys(value, name)" :key="name" class="p-0">
            {{ formatTokens(value) }}
          </b-td>
        </b-td>
        <b-td v-else class="text-capitalize">
          {{
            addNewLine(value) === '/cosmos.staking.v1beta1.MsgDelegate'
              ? 'Stake'
              : addNewLine(value) === '/cosmos.staking.v1beta1.MsgUndelegate'
              ? 'Unstake'
              : addNewLine(value) ===
                '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward'
              ? 'Claim Reward'
              : addNewLine(value) === '/cosmos.bank.v1beta1.MsgSend'
              ? tablefield['to_address'] === address
                ? 'Receive'
                : 'Send'
              : addNewLine(value)
          }}
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { BTableSimple, BTr, BTd, BTbody } from 'bootstrap-vue';
import {
  abbr,
  getStakingValidatorByHex,
  isHexAddress,
  isStringArray,
  isToken,
  percent,
  tokenFormatter
} from '@/libs/utils';
import ArrayFieldComponent from './ArrayFieldComponent.vue';

export default {
  name: 'ObjectFieldComponent',
  components: {
    BTableSimple,
    BTr,
    BTd,
    BTbody,
    ArrayFieldComponent
  },
  data() {
    return {
      address: ''
    };
  },
  props: {
    tablefield: {
      type: [Array, Object],
      default: () => {}
    },
    small: {
      type: Boolean,
      default: true
    }
  },
  created() {
    const { address } = this.$route.params;
    this.address = address;
  },
  methods: {
    formatObject(value) {
      // if (typeof (value) === 'object' && Object.keys(value).length === 1) {
      //   return value[Object.keys(value)[0]]
      // }
      return value;
    },
    isObjectText(v) {
      return String(v).startsWith('{') && String(v).endsWith('}');
    },
    toObject(v) {
      return JSON.parse(v);
    },
    formatText: v => abbr(v, 60),
    eval_value(value) {
      return Array.from(value);
    },
    isTokenField(value) {
      return isToken(value);
    },
    isHex(value) {
      return isHexAddress(value);
    },
    formatHexAddress(v) {
      const denom = v.denom === 'usix' ? 'six' : v.denom;
      const amount = parseInt(v.amount) / Math.pow(10, 6);
      return getStakingValidatorByHex(denom, amount);
      // return getStakingValidatorByHex(this.$http.config.chain_name, v);
    },
    isArrayText(value) {
      return isStringArray(value);
    },
    formatTokens(value) {
      return tokenFormatter(value);
    },
    addNewLine(value) {
      const percentage = /^0\.\d+/;

      if (percentage.test(value)) {
        return `${percent(value)}%`;
      }
      if (typeof value === 'string' && value.indexOf('\\n') > -1) {
        return value.replaceAll('\\n', '\n');
      }

      return value;
    }
  }
};
</script>

<style lang="css" scoped>
@media (min-width: 768px) {
  td:first-child {
    width: 20%;
  }
}
</style>
