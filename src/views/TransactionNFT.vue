<template>
  <div>
    <b-row>
      <b-col lg="4" md="12" sm="12" xs="12">
        <b-card>
          <b-card-body class="p-0">
            <div class="d-flex justify-content-center mb-2">
              <b-avatar
                :size="140"
                :src="require('@/assets/images/logo/six-network-logo.png')"
              />
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="8" md="12" sm="12" xs="12">
        <div>
          <span class="customizer-title">
            SIX PROTOCOL #6666
          </span>
          <router-link to="/txn-gen2/txs-details">
            <p class="customizer-text">SIX Protocol</p>
          </router-link>
        </div>
        <b-card class="mb-1">
          <b-card-body class="p-0">
            <b-row>
              <b-col class="divider-right">
                <span class="text-secondary text-small">Min Price</span>
                <span>Min Price</span>
              </b-col>
              <b-col class="divider-right">
                <span class="text-secondary text-small">Late Sale (item)</span>
                <div>
                  <span>66 SIX</span>
                  <span class="text-secondary text-small ml-25">
                    ($123,456.78)
                  </span>
                </div>
              </b-col>
              <b-col>
                <span class="text-secondary text-small">
                  Late Contract (otem)
                </span>
                <div>
                  <span>6666 SIX</span>
                  <span class="text-secondary text-small ml-25">
                    ($123,456,789.00)
                  </span>
                </div>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
        <div class="accordion mb-2" role="tablist">
          <b-card no-body class="mb-0">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div v-b-toggle="'details'" variant="info" class="style-toggle">
                <div class="d-flex align-items-center">
                  <feather-icon
                    :icon="'ListIcon'"
                    size="16"
                    class="mr-50 customizer-collapse"
                  />
                  <span class="customizer-collapse">Details</span>
                </div>
                <feather-icon
                  :icon="'ChevronDownIcon'"
                  size="20"
                  class="customizer-collapse"
                />
              </div>
            </b-card-header>
            <hr class="m-0" />
            <b-collapse
              id="details"
              visible
              accordion="details"
              role="tabpanel"
            >
              <b-card-body class="pt-0">
                <b-row class="customizer-overviews divider-bottom">
                  <b-col>
                    <div class="d-flex align-items-center">
                      <feather-icon
                        :icon="'InfoIcon'"
                        size="16"
                        class="text-secondary mr-50"
                      />
                      <span class="text-secondary">Owner:</span>
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
                <b-row class="customizer-overviews divider-bottom">
                  <b-col>
                    <div class="d-flex align-items-center">
                      <feather-icon
                        :icon="'InfoIcon'"
                        size="16"
                        class="text-secondary mr-50"
                      />
                      <span class="text-secondary">Contract Address:</span>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="d-flex align-items-center">
                      <feather-icon
                        :icon="'CheckCircleIcon'"
                        size="16"
                        class="text-success mr-50"
                      />
                      <span>0x2sss2</span>
                      <feather-icon
                        :icon="'CopyIcon'"
                        size="16"
                        class="customizer-collapse ml-50"
                      />
                    </div>
                  </b-col>
                </b-row>
                <b-row class="customizer-overviews divider-bottom">
                  <b-col>
                    <div class="d-flex align-items-center">
                      <feather-icon
                        :icon="'InfoIcon'"
                        size="16"
                        class="text-secondary mr-50"
                      />
                      <span class="text-secondary">Creator:</span>
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
                <b-row class="customizer-overviews divider-bottom">
                  <b-col>
                    <div class="d-flex align-items-center">
                      <feather-icon
                        :icon="'InfoIcon'"
                        size="16"
                        class="text-secondary mr-50"
                      />
                      <span class="text-secondary">Classification:</span>
                    </div>
                  </b-col>
                  <b-col>
                    <span>66,666</span>
                  </b-col>
                </b-row>
                <b-row class="customizer-overviews divider-bottom">
                  <b-col>
                    <div class="d-flex align-items-center">
                      <feather-icon
                        :icon="'InfoIcon'"
                        size="16"
                        class="text-secondary mr-50"
                      />
                      <span class="text-secondary">Token ID:</span>
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
                <b-row class="customizer-overviews divider-bottom">
                  <b-col>
                    <div class="d-flex align-items-center">
                      <feather-icon
                        :icon="'InfoIcon'"
                        size="16"
                        class="text-secondary mr-50"
                      />
                      <span class="text-secondary">Token Standard:</span>
                    </div>
                  </b-col>
                  <b-col>
                    <span>66,666</span>
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
                      <span class="text-secondary">Marketplaces:</span>
                    </div>
                  </b-col>
                  <b-col>
                    <span>66,666</span>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-0">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div
                v-b-toggle="'properties'"
                variant="info"
                class="style-toggle"
              >
                <div class="d-flex align-items-center">
                  <feather-icon
                    :icon="'BoxIcon'"
                    size="16"
                    class="mr-50 customizer-collapse"
                  />
                  <span class="customizer-collapse">Properties</span>
                </div>
                <feather-icon
                  :icon="'ChevronDownIcon'"
                  size="20"
                  class="customizer-collapse"
                />
              </div>
            </b-card-header>
            <hr class="m-0" />
            <b-collapse
              id="properties"
              visible
              accordion="properties"
              role="tabpanel"
            >
              <b-card-body>
                <b-row>
                  <b-col>
                    <div class="text-center card-proper">
                      <p class="mb-0 font-weight-bold style-text">
                        Hat
                      </p>
                      <p class="mb-0">
                        Spinner Hat
                      </p>
                      <p class="text-secondary mb-0 text-small">
                        Rarity: 0.8%
                      </p>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="text-center card-proper">
                      <p class="mb-0 font-weight-bold style-text">
                        Hat
                      </p>
                      <p class="mb-0">
                        Spinner Hat
                      </p>
                      <p class="text-secondary mb-0 text-small">
                        Rarity: 0.8%
                      </p>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="text-center card-proper">
                      <p class="mb-0 font-weight-bold style-text">
                        Hat
                      </p>
                      <p class="mb-0">
                        Spinner Hat
                      </p>
                      <p class="text-secondary mb-0 text-small">
                        Rarity: 0.8%
                      </p>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="text-center card-proper">
                      <p class="mb-0 font-weight-bold style-text">
                        Hat
                      </p>
                      <p class="mb-0">
                        Spinner Hat
                      </p>
                      <p class="text-secondary mb-0 text-small">
                        Rarity: 0.8%
                      </p>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="text-center card-proper">
                      <p class="mb-0 font-weight-bold style-text">
                        Hat
                      </p>
                      <p class="mb-0">
                        Spinner Hat
                      </p>
                      <p class="text-secondary mb-0 text-small">
                        Rarity: 0.8%
                      </p>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <!-- Dynamic -->
    <b-row class="mb-1">
      <b-col lg="12" md="12" sm="12" xs="12">
        <b-card no-body class="mb-0">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <div v-b-toggle="'dynamic'" variant="info" class="style-toggle">
              <div class="d-flex align-items-center">
                <feather-icon
                  :icon="'BoxIcon'"
                  size="16"
                  class="mr-50 customizer-collapse"
                />
                <span class="customizer-collapse">Dynamic Attributes (10)</span>
              </div>
              <feather-icon
                :icon="'ChevronDownIcon'"
                size="20"
                class="customizer-collapse"
              />
            </div>
          </b-card-header>
          <hr class="m-0" />
          <b-collapse id="dynamic" visible accordion="dynamic" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col class="pr-0 pt-1">
                  <div class="text-center card-proper">
                    <p class="mb-0 font-weight-bold style-text">
                      Checked in
                    </p>
                    <p class="mb-0">
                      No
                    </p>
                    <p class="text-secondary mb-0 text-small">
                      100% have this trait
                    </p>
                  </div>
                </b-col>
                <b-col class="pr-0 pt-1">
                  <div class="text-center card-proper">
                    <p class="mb-0 font-weight-bold style-text">
                      Checked in
                    </p>
                    <p class="mb-0">
                      No
                    </p>
                    <p class="text-secondary mb-0 text-small">
                      100% have this trait
                    </p>
                  </div>
                </b-col>
                <b-col class="pr-0 pt-1">
                  <div class="text-center card-proper">
                    <p class="mb-0 font-weight-bold style-text">
                      Checked in
                    </p>
                    <p class="mb-0">
                      No
                    </p>
                    <p class="text-secondary mb-0 text-small">
                      100% have this trait
                    </p>
                  </div>
                </b-col>
                <b-col class="pr-0 pt-1">
                  <div class="text-center card-proper">
                    <p class="mb-0 font-weight-bold style-text">
                      Checked in
                    </p>
                    <p class="mb-0">
                      No
                    </p>
                    <p class="text-secondary mb-0 text-small">
                      100% have this trait
                    </p>
                  </div>
                </b-col>
                <b-col class="pr-0 pt-1">
                  <div class="text-center card-proper">
                    <p class="mb-0 font-weight-bold style-text">
                      Checked in
                    </p>
                    <p class="mb-0">
                      No
                    </p>
                    <p class="text-secondary mb-0 text-small">
                      100% have this trait
                    </p>
                  </div>
                </b-col>
                <b-col class="pr-0 pt-1">
                  <div class="text-center card-proper">
                    <p class="mb-0 font-weight-bold style-text">
                      Checked in
                    </p>
                    <p class="mb-0">
                      No
                    </p>
                    <p class="text-secondary mb-0 text-small">
                      100% have this trait
                    </p>
                  </div>
                </b-col>
                <b-col class="pr-0 pt-1">
                  <div class="text-center card-proper">
                    <p class="mb-0 font-weight-bold style-text">
                      Checked in
                    </p>
                    <p class="mb-0">
                      No
                    </p>
                    <p class="text-secondary mb-0 text-small">
                      100% have this trait
                    </p>
                  </div>
                </b-col>
                <b-col class="pt-1">
                  <div class="text-center card-proper">
                    <p class="mb-0 font-weight-bold style-text">
                      Checked in
                    </p>
                    <p class="mb-0">
                      No
                    </p>
                    <p class="text-secondary mb-0 text-small">
                      100% have this trait
                    </p>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>
    <b-card>
      <p class="font-weight-bold divider-bottom pb-1 style-text">
        Item Activity
      </p>
      <p class="text-secondary">
        A total of 0 record found
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
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BRow,
  BCol,
  // BTab,
  // BTabs,
  BTable,
  BSpinner,
  BPagination,
  BAvatar,
  BCollapse,
  VBToggle
} from 'bootstrap-vue';

import {
  formatToken,
  operatorAddressToAccount,
  consensusPubkeyToHexAddress,
  toDay,
  formatTokenAmount,
  formatGasAmount
} from '@/libs/utils';

export default {
  components: {
    BCard,
    BCardBody,
    BRow,
    BCol,
    // BTab,
    // BTabs,
    BTable,
    BSpinner,
    BPagination,
    BAvatar,
    BCollapse
  },
  directives: {
    'b-toggle': VBToggle
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
      transactions: [],
      typeExpand: 'shadow',
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
.style-text {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}
.customizer-title {
  color: $info;
  align-items: center;
  font-size: 22px;
  font-weight: 700;
  .dark-layout & {
    color: $primary;
  }
}

.customizer-collapse {
  color: $info;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  .dark-layout & {
    color: $primary;
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

.style-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.divider-right {
  border-right: 1px solid $light;
  .dark-layout & {
    border-right: 0.5px solid $secondary;
  }
}

.text-small {
  font-size: 10px;
}

.card-proper {
  padding: 10px;
  border: 1px solid $light;
  border-radius: 12px;
  .dark-layout & {
    border: 0.5px solid $secondary;
  }
}
</style>
