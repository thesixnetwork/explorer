<script>
import { Line, mixins } from 'vue-chartjs';

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    // options: {
    //   type: Object,
    //   default: null,
    // },
  },
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day'
              },
              ticks: {
                autoskipping: true,
                display: true,
                maxTicksLimit: 15
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                autoskipping: true,
                display: true,
                maxTicksLimit: 8
              }
            }
          ]
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'rgb(255, 99, 132)'
            }
          }
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
