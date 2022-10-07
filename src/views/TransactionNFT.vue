<template>
  <div>
    <b-row>
      <b-col lg="4" md="12" sm="12" xs="12">
        <!-- <b-img :src="attributes.image" :alt="attributes.image" thumbnail /> -->
        <b-card>
          <div class="d-flex justify-content-center">
            <b-img :src="attributes.image" :alt="attributes.image" thumbnail />
          </div>
        </b-card>
      </b-col>
      <b-col lg="8" md="12" sm="12" xs="12">
        <div>
          <span class="customizer-title"> {{ attributes.name }} </span>
          <p class="customizer-text text-style">
            {{ attributes.schema_code }}
          </p>
        </div>
        <!--<b-card class="mb-1">
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
        </b-card>-->
        <div class="accordion mb-2" role="tablist">
          <b-card no-body class="mb-0">
            <b-card-header class="p-1 d-block" role="tab">
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
              <b-card-body class="py-0">
                <b-row class="customizer-overviews divider-bottom">
                  <b-col lg="3">
                    <div class="d-flex align-items-center">
                      <span class="text-secondary">Owner:</span>
                    </div>
                  </b-col>
                  <b-col lg="9">
                    <div class="d-flex align-items-center">
                      <span class="text-truncate customizer-text">
                        {{ attributes.owner }}
                      </span>
                      <feather-icon
                        :icon="'CopyIcon'"
                        size="16"
                        class="ml-25 customizer-copy"
                        @click="copy(attributes.owner)"
                      />
                    </div>
                  </b-col>
                </b-row>
                <b-row class="customizer-overviews divider-bottom">
                  <b-col lg="3">
                    <div class="d-flex align-items-center">
                      <span class="text-secondary">Contract Address:</span>
                    </div>
                  </b-col>
                  <b-col lg="9">
                    <div class="d-flex align-items-center">
                      <feather-icon
                        :icon="'CheckCircleIcon'"
                        size="16"
                        class="text-success mr-50"
                      />
                      <span class="text-truncate customizer-text">
                        0x898bb3b662419e79366046C625A213B83fB4809B
                      </span>
                      <feather-icon
                        :icon="'CopyIcon'"
                        size="16"
                        class="ml-25 customizer-copy"
                        @click="
                          copy('0x898bb3b662419e79366046c625a213b83fb4809b')
                        "
                      />
                    </div>
                  </b-col>
                </b-row>
                <!--<b-row class="customizer-overviews divider-bottom">
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
                </b-row>-->
                <!--<b-row class="customizer-overviews divider-bottom">
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
                </b-row>-->
                <b-row class="customizer-overviews">
                  <b-col lg="3">
                    <div class="d-flex align-items-center">
                      <span class="text-secondary">Token ID:</span>
                    </div>
                  </b-col>
                  <b-col lg="9">
                    <div class="d-flex align-items-center">
                      <span class="customizer-text">#{{ id }}</span>
                    </div>
                  </b-col>
                </b-row>
                <!--<b-row class="customizer-overviews divider-bottom">
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
                </b-row>-->
                <!--<b-row class="customizer-overviews">
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
                </b-row>-->
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-0">
            <b-card-header class="p-1 d-block" role="tab">
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
              <b-card-body class="pt-0">
                <b-row>
                  <b-col
                    v-for="item in staticAttributes"
                    :key="item.owner"
                    class="pr-0 pt-1"
                    lg="2"
                    md="4"
                    sm="6"
                    xs="6"
                  >
                    <div class="text-center card-proper">
                      <p class="mb-0 font-weight-bold style-text">
                        {{ item.trait_type }}
                      </p>
                      <p class="text-secondary mb-0 text-small">
                        Value: {{ item.value }}
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
          <b-card-header class="p-1 d-block" role="tab">
            <div v-b-toggle="'dynamic'" variant="info" class="style-toggle">
              <div class="d-flex align-items-center">
                <feather-icon
                  :icon="'BoxIcon'"
                  size="16"
                  class="mr-50 customizer-collapse"
                />
                <span class="customizer-collapse">
                  Dynamic Attributes ({{ dynamicAttributes.length }})
                </span>
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
            <b-card-body class="pt-0">
              <b-row>
                <b-col
                  v-for="item in dynamicAttributes"
                  :key="item.owner"
                  class="pr-0 pt-1"
                  lg="2"
                  md="4"
                  sm="6"
                  xs="6"
                >
                  <div class="text-center card-proper">
                    <p class="mb-0 font-weight-bold style-text text-sm">
                      {{ item.trait_type }}
                    </p>
                    <p class="mb-0">
                      {{ item.value }}
                    </p>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>
    <!-- <b-card>
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
    </b-card> -->
  </div>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardBody,
  BRow,
  BCol,
  // BTab,
  // BTabs,
  // BTable,
  // BSpinner,
  // BPagination,
  BImg,
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
import { getContract } from '@/libs/web3';
import TestNfts from '@/abi/TestNfts.json';
import axios from 'axios';

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BRow,
    BCol,
    // BTab,
    // BTabs,
    // BTable,
    // BSpinner,
    // BPagination,
    BImg,
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
    const { id } = this.$route.params;
    return {
      id,
      isBusy: false,
      transactions: [],
      typeExpand: 'shadow',
      attributes: {},
      staticAttributes: {},
      dynamicAttributes: {},
      fields: [
        { key: 'txnHash', label: 'Txn Hash' },
        { key: 'method', label: 'Method' },
        { key: 'age', label: 'Age' },
        { key: 'by', label: 'By' },
        { key: 'tokenId', label: 'Token ID' },
        { key: 'details', label: 'Details' }
      ]
    };
  },
  computed: {},
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
    this.fetchMetaData();
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
    },
    async fetchMetaData() {
      const staticType = ['Background', 'Moon', 'Plate', 'Tail', 'Whale'];
      const nftContract = getContract(
        TestNfts,
        '0x898bb3b662419e79366046C625A213B83fB4809B' || ''
      );

      const uri = await nftContract.methods.tokenURI(this.id).call();
      const ownerOf = await nftContract.methods.ownerOf(this.id).call();
      const built = axios.get(uri);
      const [allNfts, owner] = await Promise.all([built, ownerOf]);
      this.attributes = { ...allNfts.data, owner: owner };
      this.staticAttributes = allNfts.data.attributes.filter(at =>
        staticType.includes(at.trait_type)
      );
      this.dynamicAttributes = allNfts.data.attributes.filter(
        at => !staticType.includes(at.trait_type)
      );
    },
    copy(v) {
      this.$copyText(v).then(
        () => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Address copied',
              icon: 'BellIcon'
            }
          });
        },
        e => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Failed to copy address! ${e}`,
              icon: 'BellIcon',
              variant: 'danger'
            }
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.customizer-copy {
  cursor: pointer;
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}

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

.text-sm {
  font-size: 12px;
}

.customizer-title {
  color: $info;
  align-items: center;
  font-size: 18px;
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
  max-width: 400px;
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
.text-style {
  font-size: 12px;
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
