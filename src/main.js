import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";
import store from "./store";


library.add(
    icon.faEllipsisV,
    icon.faEye,
    icon.faEyeSlash,
    icon.faExchangeAlt,
    icon.faSave,
    icon.faTimes
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
