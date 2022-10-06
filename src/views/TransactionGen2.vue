<template>
  <div v-if="nFTSchema['code']">
    <b-row>
      <b-col lg="6" md="12" sm="12" xs="12">
        <b-card class="style-card">
          <b-card-body class="p-0">
            <b-row
              class="customizer-overviews divider-bottom px-1 pt-0 text-bold"
            >
              <h5 class="font-weight-bolder customizer-text">
                Overview
              </h5>
            </b-row>
            <!-- <b-row>
              <span class="text-secondary text-small px-1 pt-25 pb-25">
                Min price
              </span>
            </b-row>
            <b-row class="pt-0 pb-25 customizer-overviews divider-bottom">
              <span class="text-small px-1">$0.00</span>
              <span class="text-secondary text-small px-1">0.0000 SIX</span>
            </b-row> -->
            <b-row class="customizer-overviews">
              <b-col lg="4">
                <span class="text-small">Max Total Supply:</span>
              </b-col>
              <b-col lg="8">
                <span class="text-sm-detail">1,000,000</span>
              </b-col>
            </b-row>
            <!-- <b-row class="customizer-overviews">
              <b-col lg="4">
                <span>Holders:</span>
              </b-col>
              <b-col lg="8">
                <span>6,666</span>
              </b-col>
            </b-row> -->
            <!-- <b-row class="pt-1">
              <b-col lg="4">
                <span>Transfers:</span>
              </b-col>
              <b-col lg="8">
                <span>66,666</span>
              </b-col>
            </b-row> -->
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="6" md="12" sm="12" xs="12">
        <b-card class="style-card">
          <b-card-body v-if="nFTSchema['code']" class="p-0">
            <b-row
              class="customizer-overviews divider-bottom px-1 pt-0 text-bold"
            >
              <h5 class="font-weight-bolder customizer-text">
                Profile Summary
              </h5>
            </b-row>
            <b-row class="customizer-overviews divider-bottom">
              <b-col lg="3">
                <span class="text-small">Collection:</span>
              </b-col>
              <b-col lg="9">
                <span class="text-sm-detail style-text">
                  {{ nFTSchema['name'] }}
                </span>
              </b-col>
            </b-row>
            <b-row class="customizer-overviews divider-bottom">
              <b-col lg="3">
                <span class="text-small">Contract:</span>
              </b-col>
              <b-col lg="9" class="text-truncate">
                <span class="customizer-text text-truncate text-sm-detail">
                  {{ nFTSchema['origin_data']['origin_contract_address'] }}
                </span>
              </b-col>
            </b-row>
            <b-row class="customizer-overviews">
              <b-col lg="3">
                <span class="text-small">Schema code:</span>
              </b-col>
              <b-col lg="9" class="style-text text-sm-detail">
                <span> {{ nFTSchema['code'] }} </span>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-card>
      <b-tabs content-class="mt-1">
        <b-tab title="Gen2 Txn" active class="pa-0">
          <p class="text-secondary">
            A total of 0 transactions found
          </p>
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
          />
        </b-tab>
        <b-tab title="Collection">
          <p>Latest 0 active tokens (From a total of 0 tokens)</p>
          <b-row>
            <b-col lg="3" md="12" sm="12" xs="12">
              <router-link to="/txn-gen2/nft-txs">
                <b-card class="customizer-card">
                  <div class="d-flex justify-content-center mb-2">
                    <b-avatar
                      :size="140"
                      :src="
                        require('@/assets/images/logo/six-network-logo.png')
                      "
                    />
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
              </router-link>
            </b-col>
          </b-row>
        </b-tab>
        <!-- <b-tab title="Info">
          <p class="font-weight-bold">OVERVIEW</p>
          <p>The sixnetwork-uat.nftexpo is made up of 10k Club xxx NFTs.</p>
        </b-tab> -->
      </b-tabs>
    </b-card>
  </div>
  <div v-else>
    Data not found 🕵🏻‍♀️
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
} from 'bootstrap-vue';

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
    const { tokenCode } = this.$route.params;
    return {
      isBusy: false,
      txnGen2: [],
      transactions: [],
      tabs: [],
      fields: [
        { key: 'txnHash', label: 'Txn Hash' },
        { key: 'method', label: 'Method' },
        { key: 'age', label: 'Age' },
        { key: 'by', label: 'By' },
        { key: 'tokenId', label: 'Token ID' },
        { key: 'details', label: 'Details' }
      ],
      nFTSchema: {},
      tokenCode
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
    if (this.tokenCode !== undefined) {
      this.$http.getAllTransactions(this.tokenCode).then(res => {
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&",res)
        this.transactions = res;
      });
      this.$http
        .getMetaData1(this.tokenCode)
        .then(acc => {
          consoel.log('===============', acc);
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  mounted() {
    this.initial();
  },
  beforeRouteUpdate(to, from, next) {
    const { address } = to.params;
    if (this.tokenCode !== undefined) {
      this.$http.getAllTransactions(this.tokenCode).then(res => {
        this.transactions = res;
      });
      next();
    }
  },
  methods: {
    initial() {
      this.$http.getMetaData1(this.tokenCode).then(res => {
        this.nFTSchema = res.nFTSchema;
      });
    },
    pageload(v) {
      console.log('***************page');
      this.$http.getAllTransactions(this.tokenCode, v).then(res => {
        this.transactions = res;
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

.style-card {
  height: 200px;
  @include media-breakpoint-down(md) {
    height: auto;
  }
}

.customizer-text {
  color: $info;
  max-width: 150px;
  align-items: center;
  .dark-layout & {
    color: $primary;
  }
}

.style-text {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}
.customizer-overviews {
  padding-bottom: 10px;
  padding-top: 10px;
  align-items: center;
}

.divider-bottom {
  border-bottom: 1px solid $light;

  .dark-layout & {
    border-bottom: 0.5px solid $secondary;
  }
}

.text-small {
  font-size: 14px;
  @include media-breakpoint-down(lg) {
    font-size: 10px;
  }
}

.text-sm-detail {
  font-size: 13px;
  @include media-breakpoint-down(lg) {
    font-size: 12px;
  }
}
</style>
