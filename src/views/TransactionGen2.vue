<template>
  <div>
    <b-row>
      <b-col lg="6" md="12" sm="12" xs="12">
        <b-card>
          <b-card-body class="p-0">
            <h5>Overviews</h5>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="6" md="12" sm="12" xs="12">
        <b-card>
          <b-card-body class="p-0">
            <h5>Profile Summary</h5>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab title="Gen2 Txn" active><b-table></b-table></b-tab>
        <b-tab title="Collection"><p>I'm the second tab</p></b-tab>
        <b-tab title="Info" disabled><p>I'm a disabled tab!</p></b-tab>
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
  BTable
  // BTableSimple,
  // BTr,
  // BTd,
  // BBadge,
} from 'bootstrap-vue';
import { toDay, tokenFormatter } from '@/libs/utils';
// import ObjectFieldComponent from './ObjectFieldComponent.vue';
import store from '@/store';

export default {
  components: {
    BCard,
    BCardBody,
    BRow,
    BCol,
    BTab,
    BTabs,
    BTable
    // BTableSimple,
    // BTr,
    // BTd,
    // BBadge,
    // ObjectFieldComponent
  },
  data() {
    return {
      tx: { tx: {} },
      chain: store.state.chains.selected.chain_name
    };
  }
};
</script>

<style></style>
