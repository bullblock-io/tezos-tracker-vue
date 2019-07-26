import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import routes from "./routes";
import moment from "moment";
import BootstrapVue from "bootstrap-vue"

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { dom } from "@fortawesome/fontawesome-svg-core";

dom.watch();

library.add(fas);

Vue.config.productionTip = false;

Vue.use(VueRouter)
Vue.use(BootstrapVue)

let router = new VueRouter({
  mode: "history",
  routes
})
const MAX_HASH_LENGTH = 20
const XTZ = 1000000;

Vue.component("font-awesome-icon", FontAwesomeIcon)
Vue.component("font-awesome-layers", FontAwesomeLayers)
Vue.component("font-awesome-layers-text", FontAwesomeLayersText)


Vue.filter("tsfromnow", function (ts) {
  return moment(Number(ts) * 1000).fromNow();
});

Vue.filter("timeformat", function (ts, format) {
  return moment(Number(ts) * 1000).format(format);
});

Vue.filter("longhash", function (hash, length) {
  const l = length || MAX_HASH_LENGTH;
  if (hash.length > l) {
    return hash.slice(0, l) + "...";
  }
  return hash;
});

Vue.filter("tezos", function (amount) {
  if (amount > 0) {
    return (amount / XTZ) + " XTZ"
  }
  return "0 XTZ";
  //return amount + "ꜩ";
})



const a = new Vue({
  store,
  router,
  render: h => h(App)
});
a.$mount("#app");

