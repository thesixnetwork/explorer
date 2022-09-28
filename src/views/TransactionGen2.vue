<template>
  <div>
    <b-row>
      <b-col lg="6" md="12" sm="12" xs="12">
        <b-card>
          <b-card-body class="p-0">
            <b-row
              class="customizer-overviews divider-bottom px-1 pt-0 text-bold"
            >
              <h5 class="customizer-text">Overview</h5>
            </b-row>
            <b-row>
              <span class="text-secondary text-small px-1 pt-25 pb-25">
                Min price
              </span>
            </b-row>
            <b-row class="pt-0 pb-25 customizer-overviews divider-bottom">
              <span class="text-small px-1">$0.00</span>
              <span class="text-secondary text-small px-1">0.0000 SIX</span>
            </b-row>
            <b-row class="customizer-overviews divider-bottom">
              <b-col>
                <span>Max Total Supply:</span>
              </b-col>
              <b-col>
                <span>1,000,000</span>
              </b-col>
            </b-row>
            <b-row class="customizer-overviews divider-bottom">
              <b-col>
                <span>Holders:</span>
              </b-col>
              <b-col>
                <span>6,666</span>
              </b-col>
            </b-row>
            <b-row class="pt-1">
              <b-col>
                <span>Transfers:</span>
              </b-col>
              <b-col>
                <span>66,666</span>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="6" md="12" sm="12" xs="12">
        <b-card>
          <b-card-body class="p-0">
            <b-row
              class="customizer-overviews divider-bottom px-1 pt-0 text-bold"
            >
              <h5 class="customizer-text">Profile Summary</h5>
            </b-row>

            <b-row class="customizer-overviews divider-bottom">
              <b-col>
                <span>Collection:</span>
              </b-col>
              <b-col>
                <span>SIX PROTOCOL</span>
              </b-col>
            </b-row>
            <b-row class="customizer-overviews divider-bottom">
              <b-col>
                <span>Contract:</span>
              </b-col>
              <b-col>
                <span>6x12345</span>
              </b-col>
            </b-row>
            <b-row class="customizer-overviews divider-bottom">
              <b-col>
                <span>Official Site:</span>
              </b-col>
              <b-col>
                <span>https://xxx.xxx</span>
              </b-col>
            </b-row>
            <b-row class="pt-1">
              <b-col>
                <span>Social Profiles:</span>
              </b-col>
              <b-col>
                <span>https://xxx.xxx</span>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-card>
      <b-tabs content-class="mt-1">
        <b-tab title="Gen2 Txn" active class="pa-0">
          <p class="text-secondary">A total of 0 transactions found</p>
          <b-table
            :items="txs"
            :busy="isBusy"
            :fields="fields"
            striped
            hover
            responsive="md"
            stacked="sm"
            :style="{ fontSize: 'smaller' }"
          >
            <template #table-busy>
              <div class="text-center text-secondary my-2">
                <b-spinner small class="align-middle mr-50" />
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(block)="data">
              <router-link :to="`../blocks/${data.item.block}`">
                {{ data.item.block }}
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
        </b-tab>
        <b-tab title="Collection">
          <p>Latest 0 active tokens (From a total of 0 tokens)</p>
          <b-row>
            <b-col lg="3" md="12" sm="12" xs="12">
              <b-card class="customizer-card">
                <div class="d-flex justify-content-center mb-2">
                  <b-avatar
                    :size="140"
                    :src="require('@/assets/images/logo/six-network-logo.png')"
                  >
                  </b-avatar>
                </div>
                <div class="d-flex">
                  <span class="mr-50">Token ID:</span>
                  <span class="customizer-text text-truncate d-inline-block">
                    12341234123412341234123412341234
                  </span>
                </div>
                <div class="d-flex">
                  <span class="mr-50">Owner:</span>
                  <span class="customizer-text text-truncate d-inline-block">
                    6x12341234123412341234123412341234
                  </span>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Info">
          <p>I'm a disabled tab!</p>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BRow,
  BCol,
  BTab,
  BTabs,
  BTable,
  BSpinner,
  BPagination,
  BAvatar
  // BTableSimple,
  // BTr,
  // BTd,
  // BBadge,
} from 'bootstrap-vue';

// import ObjectFieldComponent from './ObjectFieldComponent.vue';
// import store from '@/store';

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
    BCardBody,
    BRow,
    BCol,
    BTab,
    BTabs,
    BTable,
    BSpinner,
    BPagination,
    BAvatar
    // BTableSimple,
    // BTr,
    // BTd,
    // BBadge,
    // ObjectFieldComponent
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
        console.log('this.transactions.txs', this.transactions.txs);
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
        console.log('else', this.transactions.txs);
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
    },
    csvExport(arrData) {
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += [
        Object.keys(arrData[0]).join(','),
        ...arrData.map(item => Object.values(item).join(','))
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '');
      const data = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', 'export-transaction-node.csv');
      link.click();
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
}

.text-small {
  font-size: 10px;
}
</style>
