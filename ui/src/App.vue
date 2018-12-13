<template>
  <div id="app">
    <div @click="handleStartStop" class="button">
      <h2>{{isRunning ? 'STOP' : 'START'}}</h2>
    </div>
    <div id="right" @click="save" class="button">
      <h2>SAVE</h2>
    </div>
    <div id="chartwrapper">
      <Chart/>
    </div>
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import store from "./data";
const { ipcRenderer } = window.require("electron");
export default {
  name: "app",
  components: {
    Chart
  },
  data() {
    return {
      isRunning: false
    };
  },
  methods: {
    handleStartStop() {
      this.isRunning = !this.isRunning;
      if (this.isRunning) {
        ipcRenderer.send("start");
      } else {
        ipcRenderer.send("stop");
      }
    },
    save() {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(store._data))
      );
      element.setAttribute("download", "result.json");

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  left: 0;
}
.button {
  position: absolute;
  top: 0;
  left: 0;
  height: 67.813px;
  width: 300px;
  text-align: center;
  color: gray;
  transition: 0.2s;
  cursor: pointer;
  user-select: none;
}

.button:hover {
  color: white;
  background: black;
}
#right {
  left: 300px !important;
}
#chartwrapper {
  margin-top: 67.813px;
  width: 100%;
}
</style>
