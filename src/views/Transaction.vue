<template>
  <div>
    <b-card title="Basic" class="text-truncate">
      <object-field-component v-if="!tx.std" :tablefield="tx.raw" />
      <b-table-simple v-else striped stacked="sm">
        <tbody>
          <b-tr>
            <b-td style="width:200px">
              {{ 'Tx Hash' }}
            </b-td>
            <b-td class="text-truncate">
              {{ tx.txhash }}
            </b-td>
          </b-tr>
          <b-tr>
            <b-td>
              {{ 'status' }}
            </b-td>
            <b-td class="text-wrap">
              <b-badge v-if="tx.code === 0" variant="light-success">
                Success
              </b-badge>
              <b-badge v-else variant="light-danger">
                Failed
              </b-badge>
              <b v-if="tx.code > 0"> {{ tx.raw_log }}</b>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td> {{ 'Height' }} </b-td>
            <b-td>
              <router-link :to="`/${chain}/blocks/${tx.height}`">
                {{ tx.height }}
              </router-link>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td> {{ 'Timestamp' }} </b-td>
            <b-td>{{ formatTime(tx.timestamp) }}</b-td>
          </b-tr>
          <b-tr>
            <b-td> {{ 'Gas' }} </b-td>
            <b-td>{{ tx.gas_used }} / {{ tx.gas_wanted }}</b-td>
          </b-tr>
          <b-tr>
            <b-td> {{ 'Fee' }} </b-td><b-td>{{ formattoken(tx.tx.fee) }}</b-td>
          </b-tr>
          <b-tr>
            <b-td> {{ 'Memo' }} </b-td><b-td>{{ tx.tx.memo || '-' }}</b-td>
          </b-tr>
          <b-tr>
            <b-td> {{ 'Timeout height' }} </b-td>
            <b-td>{{ tx.tx.timeout_height }}</b-td>
          </b-tr>
        </tbody>
      </b-table-simple>
    </b-card>

    <b-card
      v-if="tx.tx.messages"
      :title="`Messages (total: ${tx.tx.messages.length})`"
      no-body
    >
      <b-card-body
        v-for="(item, i) in tx.tx.messages"
        id="message"
        :key="i"
        class="message"
      >
        <object-field-component :tablefield="item" />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BTableSimple,
  BTr,
  BTd,
  BBadge,
  BCardBody
} from 'bootstrap-vue';
import { toDay, tokenFormatter } from '@/libs/utils';
import ObjectFieldComponent from './ObjectFieldComponent.vue';
import store from '@/store';

export default {
  components: {
    BCard,
    BCardBody,
    BTableSimple,
    BTr,
    BTd,
    BBadge,
    ObjectFieldComponent
  },
  data() {
    return {
      tx: { tx: {} },
      chain: store.state.chains.selected.chain_name
    };
  },

  beforeRouteUpdate(to, from, next) {
    const { hash } = to.params;
    if (hash !== from.params.hash) {
      this.$http.getTxs(hash).then(res => {
        this.tx = res;
      });
      next();
    }
  },
  created() {
    const { hash } = this.$route.params;
    this.$http.getTxs(hash).then(res => {
      this.tx = res;
    });
  },
  methods: {
    formattoken: v => tokenFormatter(v),
    formatTime: v => toDay(v)
  }
};
</script>

<style>
/* #message {
  border-top-width: 2px;
  border-top-style: double;
}
#message table.table-hover tr td:hover {
  border-style: solid;
  border-color: green;

  border: double;
  border-radius: 0.5px;
} */
</style>
