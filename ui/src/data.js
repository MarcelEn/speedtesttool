import Vue from 'vue';
import moment from 'moment';
const { ipcRenderer } = window.require('electron')


ipcRenderer.on('data', (event, results) => {
    results.forEach(result => {
        result.timestamp = moment().valueOf();
        data.push(result)
    });
})
ipcRenderer.on('error', (event, arg) => {
    console.error(arg)
})

const data = [];

export default new Vue({
    data() {
        return { data };
    }
})