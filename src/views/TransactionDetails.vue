<template>
  <div>
    <b-card>
      <h4 class="divider-bottom pb-1 style-text">
        Transaction Details
      </h4>
      <b-tabs content-class="mt-1">
        <b-tab title="Overview" active class="pa-0">
          <b-row class="customizer-overviews">
            <b-col>
              <div class="d-flex align-items-center">
                <feather-icon
                  :icon="'InfoIcon'"
                  size="16"
                  class="text-secondary mr-50"
                />
                <span class="text-secondary">Transaction Hash:</span>
              </div>
            </b-col>
            <b-col>
              <div class="d-flex align-items-center">
                <span>0x22</span>
                <feather-icon
                  :icon="'CopyIcon'"
                  size="16"
                  class="customizer-collapse ml-50"
                />
              </div>
            </b-col>
          </b-row>
          <b-row class="customizer-overviews">
            <b-col>
              <div class="d-flex align-items-center">
                <feather-icon
                  :icon="'InfoIcon'"
                  size="16"
                  class="text-secondary mr-50"
                />
                <span class="text-secondary">Status:</span>
              </div>
            </b-col>
            <b-col>
              <div class="d-flex align-items-center">
                <b-badge variant="light-success">
                  <feather-icon
                    :icon="'CheckCircleIcon'"
                    size="16"
                    class="text-success mr-50"
                  />
                  <span class="text-success">Success</span>
                </b-badge>
              </div>
            </b-col>
          </b-row>
          <b-row class="customizer-overviews">
            <b-col>
              <div class="d-flex align-items-center">
                <feather-icon
                  :icon="'InfoIcon'"
                  size="16"
                  class="text-secondary mr-50"
                />
                <span class="text-secondary">Block:</span>
              </div>
            </b-col>
            <b-col>
              <div class="d-flex align-items-center">
                <feather-icon
                  :icon="'CheckCircleIcon'"
                  size="16"
                  class="text-success mr-50"
                />
                <span class="style-text">123456789</span>
              </div>
            </b-col>
          </b-row>
          <b-row class="customizer-overviews">
            <b-col>
              <div class="d-flex align-items-center">
                <feather-icon
                  :icon="'InfoIcon'"
                  size="16"
                  class="text-secondary mr-50"
                />
                <span class="text-secondary">Timestamp:</span>
              </div>
            </b-col>
            <b-col>
              <div class="d-flex align-items-center">
                <feather-icon :icon="'ClockIcon'" size="16" class="mr-50" />
                <span>6 hrs 36 mins ago ()</span>
              </div>
            </b-col>
          </b-row>
          <b-row class="customizer-overviews">
            <b-col>
              <div class="d-flex align-items-center">
                <feather-icon
                  :icon="'InfoIcon'"
                  size="16"
                  class="text-secondary mr-50"
                />
                <span class="text-secondary">Transaction Fee:</span>
              </div>
            </b-col>
            <b-col>
              <div class="d-flex align-items-center">
                <span>0.00025 SIX</span>
              </div>
            </b-col>
          </b-row>
          <b-row class="customizer-overviews">
            <b-col>
              <div class="d-flex align-items-center">
                <feather-icon
                  :icon="'InfoIcon'"
                  size="16"
                  class="text-secondary mr-50"
                />
                <span class="text-secondary">Gas Price:</span>
              </div>
            </b-col>
            <b-col>
              <div class="d-flex align-items-center">
                <span>0.000000001</span>
              </div>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Logs (x)" disabled>
          <p>I'm a Logs tab!</p>
        </b-tab>
        <b-tab title="State" disabled>
          <p>I'm a State tab!</p>
        </b-tab>
        <b-tab title="Comments" disabled>
          <p>I'm a Comments tab!</p>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { BCard, BRow, BCol, BTab, BTabs, BBadge } from 'bootstrap-vue';

import {
  percent,
  formatToken,
  operatorAddressToAccount,
  consensusPubkeyToHexAddress,
  toDay,
  abbrAddress,
  formatTokenAmount,
  formatGasAmount,
  tokenFormatter
} from '@/libs/utils';

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTab,
    BTabs,
    BBadge
  },
  beforeRouteUpdate(to, from, next) {
    const { address } = to.params;
    if (address !== from.params.hash) {
      this.address = address;
      this.$http
        .getAuthAccount(this.address)
        .then(acc => {
          this.account = acc;
          this.initial();
          this.$http.getTxsBySender(this.address).then(res => {
            console.log("______________________3")
            this.transactions = res;
          });
        })
        .catch(err => {
          this.error = err;
        });
      next();
    }
  },
  data() {
    return {
      isBusy: false,
      txnGen2: [],
      transactions: [],
      tabs: [],
      fields: [
        { key: 'txnHash', label: 'Txn Hash' },
        { key: 'method', label: 'Method' },
        { key: 'age', label: 'Age' },
        { key: 'from', label: 'From' },
        { key: 'to', label: 'To' },
        { key: 'tokenId', label: 'Token ID' },
        { key: 'details', label: 'Details' }
      ]
    };
  },
  computed: {
    txs() {
      if (this.transactions.txs) {
        this.isBusy = false;
        return this.transactions.txs.map(x => ({
          txhash: x.txhash,
          type:
            typeof codeMessage[x.type.split('.').slice(-1)] !== 'undefined'
              ? x.type.split('.').slice(-1)[0] === 'MsgSend' &&
                x.decode_tx.fromAddress !== this.address
                ? 'Receive'
                : codeMessage[x.type.split('.').slice(-1)].message
              : x.type,
          block: Number(x.block_height),
          value:
            typeof x.decode_tx.amount !== 'undefined'
              ? (typeof x.decode_tx.amount.amount !== 'undefined' &&
                  `${formatTokenAmount(x.decode_tx.amount.amount) +
                    ' ' +
                    'SIX'}`) ||
                (typeof x.decode_tx.amount[0] !== 'undefined' &&
                  `${formatTokenAmount(x.decode_tx.amount[0].amount) +
                    ' ' +
                    'SIX'}`) ||
                '-'
              : '-',
          commission:
            typeof x.decode_tx.commission !== 'undefined'
              ? (typeof x.decode_tx.commission.amount !== 'undefined' &&
                  `${formatTokenAmount(x.decode_tx.commission.amount) +
                    ' ' +
                    'SIX'}`) ||
                (typeof x.decode_tx.commission[0] !== 'undefined' &&
                  `${formatTokenAmount(x.decode_tx.commission[0].amount) +
                    ' ' +
                    'SIX'}`) ||
                '-'
              : '-',
          txnFee: `${formatGasAmount(x.decode_tx.fee_amount) + ' ' + 'SIX'}`,
          time: toDay(x.time_stamp)
        }));
      } else {
        this.isBusy = true;
        return [
          {
            txhash: '',
            type: '',
            block: '',
            value: '',
            commission: '',
            txnFee: '',
            time: ''
          }
        ];
      }
    }
  },
  created() {
    this.tabs = this.$children;
    this.$http
      .getAuthAccount(this.address)
      .then(acc => {
        this.account = acc;
        this.initial();
        this.$http.getTxsBySender(this.address).then(res => {
          console.log("______________________4")
          this.transactions = res;
        });
        this.$http.getStakingParameters().then(res => {
          this.stakingParameters = res;
        });
      })
      .catch(err => {
        this.error = err;
      });
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
          console.log("______________________1")
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
        this.hexAddress = consensusPubkeyToHexAddress(data.consensus_pubkey);
        fetch(
          `${process.env.VUE_APP_API_VALIDATOR}/api/validator/propose-count?proposerAddr=${this.hexAddress}`
        )
          .then(data => data.json())
          .then(resp => {
            this.proposeTransactions = resp.data;
          });
      });
      this.$http.getValidatorDistribution(this.address).then(res => {
        this.distribution = res;
      });
    },
    pageload(v) {
      this.$http.getTxsBySender(this.accountAddress, v).then(res => {
        console.log("______________________2")
        this.transactions = res;
      });
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.customizer-card {
  color: $secondary;
  border-radius: 12px;
  font-size: 0.9rem;
  border: 1px solid $light;
  cursor: pointer;
}

.customizer-text {
  color: $info;
  max-width: 150px;
  align-items: center;
  .dark-layout & {
    color: $primary;
  }
}

.customizer-overviews {
  padding-bottom: 10px;
  padding-top: 10px;
}

.divider-bottom {
  border-bottom: 1px solid $light;

  .dark-layout & {
    border-bottom: 0.5px solid $secondary;
  }
}

.text-small {
  font-size: 10px;
}

.style-text {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}
</style>
