<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";
import store from "@/data";

export default {
  components: {
    LineChart
  },
  computed: {
    datacollection() {
      return {
        labels: ["", "", "", "", "", "", "", "", "", ""],
        datasets: [
          {
            label: "Upload",
            borderColor: "red",
            data: this.createArray.concat(store.data.map(d => d.speeds.upload))
          },
          {
            label: "Download",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            borderColor: "rgb(86, 151, 255)",
            data: this.createArray.concat(
              store.data.map(d => d.speeds.download)
            )
          }
        ]
      };
    },
    createArray() {
      const blankData = [];
      for (let i = 0; i < 10 - store.data.length; i++) {
        blankData.push(0);
      }
      return blankData;
    }
  }
};
</script>

<style>
.small {
  width: 600px;
}
</style>