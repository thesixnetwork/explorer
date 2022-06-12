<template>
  <div>
    <b-card class="customizer-border">
      <b-row>
        <!-- User Info: Left col -->
        <b-col
          cols="21"
          xl="6"
          class="d-flex justify-content-between flex-column"
        >
          <!-- User Avatar & Action Buttons -->
          <div class="d-flex justify-content-start">
            <b-avatar
              v-if="validator.description.details"
              :src="
                `https://i.imgur.com/${
                  fetch_details(validator.description.details).im
                }.png`
              "
              alt="avatar"
              variant="link"
              class="customizer-icon"
              size="104px"
              rounded
              :style="{ border: '1px solid rgba(198,198,198,0.5)' }"
            />
            <b-avatar
              v-else
              alt="avatar"
              variant="link"
              class="customizer-icon"
              size="104px"
              rounded
              :style="{ border: '1px solid rgba(198,198,198,0.5)' }"
            />
            <div class="d-flex flex-column ml-1">
              <div class="mb-1">
                <h4 class="mb-25">
                  {{ validator.description.moniker }}
                </h4>
                <span v-if="validator.description.details">
                  {{ fetch_details(validator.description.details).sd }}
                </span>
              </div>
              <!-- <div class="d-flex flex-wrap">
                <b-button
                  v-b-modal.operation-modal
                  variant="link"
                  class="mr-25 mb-25 customizer-button"
                >
                  Delegate
                </b-button>
              </div> -->
            </div>
          </div>

          <!-- User Stats -->
          <div class="d-flex flex-wrap align-items-center mt-2">
            <div class="d-flex align-items-center mr-2">
              <b-avatar variant="light-primary" rounded>
                <feather-icon icon="DiscIcon" size="18" />
              </b-avatar>
              <div class="ml-1">
                <h5 class="mb-0">
                  {{ tokenFormatter(validator.tokens) }}
                </h5>
                <small>Bonded Tokens</small>
              </div>
            </div>

            <div class="d-flex align-items-center mr-2">
              <b-avatar variant="light-warning" rounded>
                <feather-icon icon="DivideCircleIcon" size="18" />
              </b-avatar>
              <div class="ml-1">
                <h5 class="mb-0">
                  {{
                    percentFormat(
                      selfDelegation.balance.amount / validator.tokens
                    )
                  }}%
                </h5>
                <small>Self Delegation</small>
              </div>
            </div>

            <div v-if="mintInflation" class="d-flex align-items-center">
              <b-avatar variant="light-success" rounded>
                <feather-icon icon="TrendingUpIcon" size="18" />
              </b-avatar>
              <div class="ml-1">
                <h5 class="mb-0">
                  {{ apr(validator.commission.rate) }}
                </h5>
                <small>Annual Profit</small>
              </div>
            </div>
          </div>
        </b-col>

        <!-- Right Col: Table -->
        <b-col cols="12" xl="6">
          <table class="mt-2 mt-xl-0 w-100">
            <!-- <tr>
              <th class="pb-50 d-flex align-items-center">
                <feather-icon icon="UserIcon" class="mr-75" />
                <span class="font-weight-bold">Identity</span>
              </th>
              <td class="pb-50">
                <small>{{ validator.description.identity || '-' }}</small>
              </td>
            </tr> -->
            <tr>
              <th class="pb-50 d-flex align-items-center">
                <feather-icon icon="ActivityIcon" class="mr-75" />
                <span class="font-weight-bold">Status</span>
              </th>
              <td class="pb-50 text-capitalize">
                <b-badge v-if="validator.status == 3" variant="light-success">
                  Active
                </b-badge>
                <span v-else>{{ validator.status }}</span>
              </td>
            </tr>
            <!-- <tr>
              <th class="pb-50 d-flex align-items-center">
                <feather-icon icon="StarIcon" class="mr-75" />
                <span class="font-weight-bold">Unbond Height</span>
              </th>
              <td class="pb-50 text-capitalize">
                {{ validator.unbonding_height || '-' }}
              </td>
            </tr> -->
            <!-- <tr>
             <th class="pb-50 d-flex align-items-center">
                <feather-icon icon="StarIcon" class="mr-75" />
                <span class="font-weight-bold">Unbond Time</span>
              </th>
              <td
                v-if="validator.unbonding_time == '1970-01-01T00:00:00Z'"
                class="pb-50 text-capitalize"
              >
                {{ '-' }}
              </td>
              <td v-else class="pb-50 text-capitalize">
                {{ timeFormat(validator.unbonding_time) }}
              </td>
            </tr> -->
            <tr>
              <th class="pb-50 d-flex align-items-center">
                <feather-icon icon="StarIcon" class="mr-75" />
                <span class="font-weight-bold">Min Self Delegation</span>
              </th>
              <td class="pb-50">
                {{ tokenFormatter(validator.min_self_delegation) }}
              </td>
            </tr>
            <!-- <tr>
              <th class="pb-50 d-flex align-items-center">
                <feather-icon icon="AlertCircleIcon" class="mr-75" />
                <span class="font-weight-bold">Jailed</span>
              </th>
              <td class="pb-50">
                {{ validator.jailed || '-' }}
              </td>
            </tr> -->
            <tr>
              <th class="pb-50 d-flex align-items-center">
                <feather-icon icon="GlobeIcon" class="mr-75" />
                <span class="font-weight-bold">Website</span>
              </th>
              <td v-if="validator.description.website" class="pb-50">
                <a :href="validator.description.website" target="_blank">
                  {{ validator.description.website }}
                </a>
              </td>
              <td v-else class="pb-50">
                <span>{{ '-' }}</span>
              </td>
            </tr>
            <tr>
              <th>
                <feather-icon icon="FacebookIcon" class="mr-75" />
                <span class="font-weight-bold">Facebook</span>
              </th>
              <td v-if="validator.description.security_contact">
                <a
                  :href="
                    fetch_details(validator.description.security_contact).fb
                  "
                  target="_blank"
                >
                  {{
                    fetch_details(validator.description.security_contact).fb ||
                      '-'
                  }}
                </a>
              </td>
              <td v-else>
                <span>{{ '-' }}</span>
              </td>
            </tr>
          </table>
        </b-col>
      </b-row>

      <!-- <b-card-footer class="mt-1 pl-0 pr-0">
        <h5>Description</h5>
        {{
          validator.description.long_desc ||
            'SIX Network focuses on unleashing the true power of digital assets through the company’s flagship product, "SIX Protocol," utilizing the power of blockchain and smart contracts to create effective decentralized financial services and a blockchain infrastructure essential for businesses.'
        }}
      </b-card-footer> -->
    </b-card>
    <!-- First Row -->
    <template>
      <b-row class="match-height">
        <b-col lg="4" md="12">
          <staking-commission-component :data="validator.commission" />
        </b-col>
        <b-col lg="4" md="12">
          <staking-reward-component
            :data="distribution"
            :validator="validator.operator_address"
            :address="accountAddress"
          />
        </b-col>
        <b-col lg="4" md="12">
          <staking-address-component
            :hex-address="hexAddress"
            :operator-address="validator.operator_address"
            :consensus-pubkey="validator.consensus_pubkey"
            :account-address="accountAddress"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card title="Transactions">
            <b-table :items="txs" striped hover responsive stacked="sm">
              <template #cell(height)="data">
                <router-link :to="`../blocks/${data.item.height}`">
                  {{ data.item.height }}
                </router-link>
              </template>
              <template #cell(txhash)="data">
                <router-link :to="`../tx/${data.item.txhash}`">
                  {{ formatHash(data.item.txhash) }}
                </router-link>
              </template>
            </b-table>
            <b-pagination
              v-if="Number(transactions.page_total) > 1"
              :total-rows="transactions.total_count"
              :per-page="transactions.limit"
              :value="transactions.page_number"
              align="center"
              class="mt-1"
              @change="pageload"
            />
          </b-card>
        </b-col>
      </b-row>
    </template>
    <operation-modal
      type="Delegate"
      :validator-address="validator.operator_address"
    />
    <div id="txevent" />
  </div>
</template>

<script>
import {
  BCard,
  // BButton,
  BAvatar,
  BRow,
  BCol,
  BTable,
  // BCardFooter,
  VBTooltip,
  VBModal,
  BBadge,
  BPagination
} from 'bootstrap-vue';

import {
  percent,
  formatToken,
  StakingParameters,
  Validator,
  operatorAddressToAccount,
  consensusPubkeyToHexAddress,
  toDay,
  abbrMessage,
  abbrAddress
} from '@/libs/utils';
import _ from 'lodash';
import { keybase } from '@/libs/fetch';
import StakingAddressComponent from './StakingAddressComponent.vue';
import StakingCommissionComponent from './StakingCommissionComponent.vue';
import StakingRewardComponent from './StakingRewardComponent.vue';
import OperationModal from '@/views/components/OperationModal/index.vue';

export default {
  components: {
    BCard,
    // BButton,
    BRow,
    BCol,
    BAvatar,
    // BCardFooter,
    BBadge,
    BPagination,
    BTable,
    StakingAddressComponent,
    StakingCommissionComponent,
    StakingRewardComponent,
    // eslint-disable-next-line vue/no-unused-components
    OperationModal
  },
  directives: {
    'b-modal': VBModal,
    'b-tooltip': VBTooltip
  },
  data() {
    return {
      commission: {
        series: [90],
        completed: 89,
        inProgress: 64
      },
      selfDelegation: {
        balance: { amount: 0 }
      },
      latestHeight: 0,
      accountAddress: '-',
      hexAddress: '-',
      stakingPool: {},
      mintInflation: 0,
      stakingParameter: new StakingParameters(),
      validator: new Validator(),
      userData: {},
      blocks: Array.from('0'.repeat(100)).map(x => [Boolean(x), Number(x)]),
      distribution: {},
      transactions: {}
    };
  },
  computed: {
    txs() {
      if (this.transactions.txs) {
        return this.transactions.txs.map(x => ({
          height: Number(x.height),
          txhash: x.txhash,
          message: abbrMessage(x.tx.value ? x.tx.value.msg : x.tx.msg),
          time: toDay(x.timestamp)
        }));
      }
      return [];
    }
  },
  created() {
    this.$http.getStakingPool().then(res => {
      this.stakingPool = res;
    });
    this.$http.getStakingParameters().then(res => {
      this.stakingParameter = res;
    });
    this.$http.getMintingInflation().then(res => {
      this.mintInflation = res;
    });
    this.address = this.$route.params.address;
    this.initial();
  },
  mounted() {
    const elem = document.getElementById('txevent');
    elem.addEventListener('txcompleted', () => {
      this.initial();
    });
  },
  methods: {
    initial() {
      this.$http.getStakingValidator(this.address).then(data => {
        this.validator = data;
        this.processAddress(data.operator_address, data.consensus_pubkey);
        this.$http.getTxsBySender(this.accountAddress).then(res => {
          this.transactions = res;
        });

        const { identity } = data.description;
        keybase(identity).then(d => {
          if (Array.isArray(d.them) && d.them.length > 0) {
            this.$set(this.validator, 'avatar', d.them[0].pictures.primary.url);
            this.$store.commit('cacheAvatar', {
              identity,
              url: d.them[0].pictures.primary.url
            });
          }
        });
      });
      this.$http.getValidatorDistribution(this.address).then(res => {
        this.distribution = res;
      });
    },
    pageload(v) {
      this.$http.getTxsBySender(this.accountAddress, v).then(res => {
        this.transactions = res;
      });
    },
    formatHash: abbrAddress,
    timeFormat(value) {
      return toDay(value);
    },
    percentFormat(value) {
      return percent(value);
    },
    processAddress(operAddress, consensusPubkey) {
      this.accountAddress = operatorAddressToAccount(operAddress);
      this.hexAddress = consensusPubkeyToHexAddress(consensusPubkey);
      this.$http
        .getStakingDelegatorDelegation(this.accountAddress, operAddress)
        .then(d => {
          this.selfDelegation = d;
        });
    },
    tokenFormatter(token) {
      return formatToken({
        amount: token,
        denom: this.stakingParameter.bond_denom
      });
    },
    apr(rate) {
      return `${percent((1 - rate) * this.mintInflation)} %`;
    },
    fetch_status(item, lastHeight) {
      return this.$http.getBlockByHeight(item[1]).then(res => {
        if (item[1] !== lastHeight) {
          const sigs = res.block.last_commit.signatures.find(
            s => s.validator_address === this.hexAddress
          );
          const block = this.blocks.find(b => b[1] === item[1]);
          if (typeof block !== 'undefined') {
            this.$set(block, 0, typeof sigs !== 'undefined');
          }
        }
      });
    },
    fetch_latest() {
      this.$http.getLatestBlock().then(res => {
        const sigs = res.block.last_commit.signatures.find(
          s => s.validator_address === this.hexAddress
        );
        const block = this.blocks.find(
          b => b[1] === res.block.last_commit.height
        );
        if (typeof block === 'undefined') {
          // mei
          // this.$set(block, 0, typeof sigs !== 'undefined')
          if (this.blocks.length > 999) this.blocks.shift();
          this.blocks.push([
            typeof sigs !== 'undefined',
            res.block.last_commit.height
          ]);
        }
      });
    },
    fetch_details(data) {
      const output = {};
      const input = data;
      input
        .split('|')
        .map(x => _.set(output, x.split('=')[0], x.split('=')[1]));

      return output;
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

.customizer-icon {
  color: $info;
  background-color: rgba($info, 0.12);

  .dark-layout & {
    color: $primary;
    background-color: rgba($primary, 0.12);
  }
}

.customizer-border {
  border: 1px solid $info;

  .dark-layout & {
    border: 1px solid $primary;
  }
}
</style>
