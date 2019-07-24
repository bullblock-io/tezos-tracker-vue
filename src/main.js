import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import routes from "./routes";
import moment from "moment";
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from "@fortawesome/vue-fontawesome";
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false;

Vue.use(VueRouter)
Vue.use(BootstrapVue)

let router = new VueRouter({
  mode: "history",
  routes
})
const MAX_HASH_LENGTH = 10


Vue.component("font-awesome-icon", FontAwesomeIcon)
Vue.component("font-awesome-layers", FontAwesomeLayers)
Vue.component("font-awesome-layers-text", FontAwesomeLayersText)


Vue.filter("tsfromnow", function (ts) {
  return moment(Number(ts) * 1000).fromNow();
});

Vue.filter("longhash", function (hash) {
  if (hash.length > MAX_HASH_LENGTH) {
    return hash.slice(0, MAX_HASH_LENGTH) + "...";
  }
  return hash;
});

Vue.filter("tezos", function (amount) {
  return amount + "ꜩ"
})



const a = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

