import Vue from "vue";
import "./request";
import "./utils";
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';

Vue.use(VueViewer, {
    defaultOptions: {
        zIndex: 99999
    }
})