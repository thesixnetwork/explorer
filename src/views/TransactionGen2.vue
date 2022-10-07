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
                <span class="text-sm-detail style-text">{{ totalSupply }}</span>
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
                  <feather-icon
                    :icon="'CopyIcon'"
                    size="16"
                    class="ml-25 customizer-copy"
                    @click="
                      copy(nFTSchema['origin_data']['origin_contract_address'])
                    "
                  />
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
          <div class="mb-1">
            <span class="text-secondary">
              A total of
              <span class="font-weight-bold text-primary px-50">
                {{ txs.length }}
              </span>
              transactions found
            </span>
          </div>

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
            <template #cell(txhash)="data">
              <router-link :to="`/txn-gen2/txs-details/${data.item.txhash}`">
                {{ formatHash(data.item.txhash) }}
              </router-link>
            </template>
          </b-table>
          <b-pagination
            v-if="Number(transactions.totalPage) > 1"
            :total-rows="transactions.total_count"
            :per-page="transactions.limit"
            :value="transactions.pageNumber"
            align="center"
            class="mt-1"
          />
        </b-tab>
        <b-tab title="Collection">
          <div class="flex justify-content-end mb-1">
            <b-pagination
              v-if="Number(totalSupply / limit) > 1"
              :total-rows="totalSupply"
              :per-page="limit"
              :value="currentPage"
              v-model="currentPage"
              size="sm"
            />
          </div>
          <b-row>
            <b-col
              v-for="(item, index) in totalPages"
              :key="index"
              lg="2"
              md="4"
              sm="6"
              xs="6"
              class="pl-20"
            >
              <router-link :to="`/txn-gen2/nft-txs/${index + 1}`">
                <b-card-body class="customizer-card">
                  <div class="d-flex justify-content-center mb-1">
                    <b-img
                      :src="item.image"
                      :alt="item.image"
                      height="120px"
                      width="120px"
                    />
                  </div>
                  <div class="d-flex">
                    <span class="mr-25 text-xs">Token ID:</span>
                    <span
                      class="customizer-text text-truncate d-inline-block text-xs"
                    >
                      {{ item.name }}
                    </span>
                  </div>
                  <div class="d-flex">
                    <span class="mr-25 text-xs">Owner:</span>
                    <span
                      class="customizer-text text-truncate d-inline-block text-xs"
                    >
                      {{ item.owner }}
                    </span>
                  </div>
                </b-card-body>
              </router-link>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
  <div v-else>
    <h3 class="text-center">
      Data not found 🕵🏻‍♀️
    </h3>
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
  BImg
} from 'bootstrap-vue';

import { toDay, abbrAddress } from '@/libs/utils';
import TestNfts from '@/abi/TestNfts.json';
import { getContract } from '@/libs/web3';
import axios from 'axios';
import Multicall from '@dopex-io/web3-multicall';
import Web3 from 'web3';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import _ from 'lodash';

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
    BImg
    // BAvatar
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
      nfts: [],
      fields: [
        { key: 'txhash', label: 'Txn Hash' },
        { key: 'method', label: 'Method' },
        { key: 'age', label: 'Age' },
        { key: 'by', label: 'By' }
      ],
      nFTSchema: {},
      tokenCode,
      totalSupply: 0,
      limit: 30,
      currentPage: 0,
      contractAddress: ''
    };
  },
  computed: {
    txs() {
      if (this.transactions.data) {
        this.isBusy = false;
        return this.transactions.data.txs.map(x => ({
          txhash: x.txhash,
          method:
            x.type === '/sixnft.nftmngr.MsgCreateNFTSchema'
              ? 'Create NFT Schema'
              : x.type,
          age: toDay(x.time_stamp),
          by: abbrAddress(x.decode_tx.creator)
        }));
      } else {
        this.isBusy = true;
        return [
          {
            txhash: '',
            method: '',
            age: '',
            by: ''
          }
        ];
      }
    },
    totalPages: function() {
      return this.nfts.slice(
        Number(this.currentPage - 1) * Number(this.limit),
        Number(this.currentPage) * Number(this.limit)
      );
    }
  },
  created() {
    this.tabs = this.$children;
    if (this.tokenCode !== undefined) {
      this.$http.getAllTransactions(this.tokenCode).then(res => {
        this.transactions = res;
      });
    }
  },
  mounted() {
    this.initial();
    this.fetchMetaData();
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
      this.$http.getNftSchema(this.tokenCode).then(res => {
        this.nFTSchema = res.nFTSchema;
      });
    },
    pageload(v) {
      this.$http.getAllTransactions(this.tokenCode, v).then(res => {
        this.transactions = res;
      });
    },
    async fetchMetaData() {
      const nftContract = getContract(
        TestNfts,
        '0x898bb3b662419e79366046C625A213B83fB4809B' || ''
      );

      this.contractAddress = _.get(nftContract, '_address');
      const totalSupply = await nftContract.methods.totalSupply().call();
      this.totalSupply = totalSupply;
      const web3 = new Web3('https://klaytn-api.fingerlabs.io/' || '');
      const aggregate = [...Array(parseInt(totalSupply))].map((x, index) =>
        nftContract.methods.tokenURI(parseInt(index + 1)).call()
      );
      const ownerOf = [...Array(parseInt(totalSupply))].map((x, index) =>
        nftContract.methods.ownerOf(parseInt(index + 1)).call()
      );
      const alloOwnerOf = await Promise.all(ownerOf);
      const all = await Promise.all(aggregate);
      const built = all.map(uri => axios.get(uri));
      const allNfts = await Promise.all(built);
      const allData = allNfts.map((x, i) => {
        return { ...x.data, owner: alloOwnerOf[i] };
      });

      this.nfts = allData;
    },
    formatHash: abbrAddress,
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

.customizer-button {
  background-color: $info;
  color: #fff;
  font-size: 0.8rem;
  border-radius: 12px;
  padding: 8px 14px;

  .dark-layout & {
    background-color: $primary;
    color: #fff;
  }
}

.customizer-card {
  color: $secondary;
  border-radius: 12px;
  border: 1px solid $light;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 10px 12px;
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

.text-xs {
  font-size: 9px;
}

.text-sm-detail {
  font-size: 13px;
  @include media-breakpoint-down(lg) {
    font-size: 12px;
  }
}
</style>
