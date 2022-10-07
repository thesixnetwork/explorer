<template>
  <div>
    <b-card>
      <h4 class="divider-bottom pb-1 style-text mb-1">
        Transaction Details
      </h4>
      <div v-if="tx.statusCode === 'V:0001'">
        <b-tabs content-class="mt-1">
          <b-tab title="Overview" active class="pa-0">
            <b-table-simple striped stacked="sm">
              <tbody>
                <b-tr>
                  <b-td style="width:200px">
                    {{ 'Transaction Hash' }}
                  </b-td>
                  <b-td class="text-truncate customizer-text">
                    {{ tx.data.txhash }}
                    <feather-icon
                      :icon="'CopyIcon'"
                      size="16"
                      class="ml-25 customizer-copy"
                      @click="copy(tx.data.txhash)"
                    />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td>
                    {{ 'Status' }}
                  </b-td>
                  <b-td class="text-wrap">
                    <b-badge v-if="tx.data.code === 0" variant="light-success">
                      <feather-icon
                        :icon="'CheckCircleIcon'"
                        size="16"
                        class="text-success mr-25"
                      />
                      Success
                    </b-badge>
                    <b-badge v-else variant="light-danger">
                      Failed
                    </b-badge>
                    <b v-if="tx.data.code > 0"> {{ tx.data.raw_log }}</b>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td>
                    {{ 'Block' }}
                  </b-td>
                  <b-td class="text-truncate">
                    <feather-icon
                      :icon="'CheckCircleIcon'"
                      size="16"
                      class="text-success mr-25"
                    />
                    {{ tx.data.block_height }}
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td> {{ 'Timestamp' }} </b-td>
                  <b-td>
                    <feather-icon :icon="'ClockIcon'" size="16" class="mr-25" />
                    {{ formatTime(tx.data.time_stamp) }}
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td>
                    {{ 'Action' }}
                  </b-td>
                  <b-td class="text-truncate">
                    <b-badge variant="light-secondary">
                      {{ tx.data.events[0].value.replaceAll('_', ' ') }}
                    </b-badge>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td>
                    {{ 'By' }}
                  </b-td>
                  <b-td class="text-truncate customizer-text">
                    {{ tx.data.decode_tx.creator }}
                    <feather-icon
                      :icon="'CopyIcon'"
                      size="16"
                      class="ml-25 customizer-copy"
                      @click="copy(tx.data.decode_tx.creator)"
                    />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td> {{ 'Gas' }} </b-td>
                  <b-td>
                    {{ tx.data.gas_used || '-' }} /
                    {{ tx.data.gas_wanted || '-' }}
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td> {{ 'Fee' }} </b-td>
                  <b-td>
                    {{
                      tx.data.fee_amount.amount / Math.pow(10, 6) ||
                        '-' ||
                        formattoken(tx.data.fee_amount.amount)
                    }}
                  </b-td>
                </b-tr>
              </tbody>
            </b-table-simple>
          </b-tab>
        </b-tabs>
      </div>
      <div v-else>
        <b-card>
          <div class="flex align-items-center justify-content-center">
            <b-spinner class="mr-50" />
            <span class="text-center mb-0">
              Loading Data 🕵🏻‍♀️
            </span>
          </div>
        </b-card>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BTableSimple,
  BTr,
  BTd,
  BTab,
  BTabs,
  BBadge,
  BSpinner
} from 'bootstrap-vue';

import { tokenFormatter, toDay } from '@/libs/utils';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
export default {
  components: {
    BCard,
    BTableSimple,
    BTr,
    BTd,
    BTab,
    BTabs,
    BBadge,
    BSpinner
  },
  beforeRouteUpdate(to, from, next) {
    const { address } = to.params;
    const { hash } = this.$route.params.hash;
    if (address !== from.params.txHash) {
      this.$http.getTransactionByHash(hash).then(res => {
        this.tx = res;
      });
      next();
    }
  },
  data() {
    return {
      isBusy: false,
      tabs: [],
      tx: {}
    };
  },

  created() {
    this.tabs = this.$children;
    this.$http.getTransactionByHash(this.$route.params.hash).then(res => {
      this.tx = res;
    });
  },
  mounted() {},
  methods: {
    formattoken: v => tokenFormatter(v),
    formatTime: v => toDay(v),
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

.customizer-card {
  color: $secondary;
  border-radius: 12px;
  font-size: 0.9rem;
  border: 1px solid $light;
  cursor: pointer;
}

.customizer-copy {
  cursor: pointer;
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}

.customizer-text {
  color: $info;

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
