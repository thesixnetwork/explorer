<template>
  <trading-vue
    :data="data"
    :width="width"
    :height="height"
    :toolbar="false"
    :color-back="colors.colorBack"
    :color-grid="colors.colorGrid"
    :color-text="colors.colorText"
  />
</template>
<script>
import TradingVue from 'trading-vue-js';

export default {
  name: 'App',
  components: { TradingVue },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: {},
      width: 700,
      height: 600,
      colors: {
        colorBack: '#00000000', // '#fff',
        colorGrid: '#333', // '#eee',
        colorText: '#aaa'
      }
    };
  },
  computed: {
    tvData() {
      return {
        ohlcv: this.list
      };
    }
  },
  created() {
    this.$http.getMarketChart(14, 'cosmos').then(res => {
      const ohlcv = res.prices.map((v, i) => {
        // const v2 = v
        v.push(v[1]);
        v.push(v[1]);
        v.push(v[1]);
        v.push(res.total_volumes[i][1]);
        return v;
      });

      this.data = {
        ohlcv
      };
    });
  }
};
</script>
