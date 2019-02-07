import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
import io from "socket.io-client";
import Cookies from "js-cookie";

import auth from "./modules/auth";
import workers from "./modules/workers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    personalAccount: false,
    users: []
  },
  actions: {
    getUsers(context) {
      const authKey = Cookies.get("auth_key");

      if (authKey !== undefined) {
        axios.get(`//localhost:3000/api/v1/users/${authKey}`)
          .then((res) => {
            context.commit("setUsers", res.data);
          });
      }
    }
  },
  mutations: {
    setUsers: (state, payload) => state.users = payload,
    setPersonalAccount: (state, payload) => state.personalAccount = payload
  },
  getters: {
    users: state => state.users,
    personalAccount: state => state.personalAccount
  },
  modules: {
    auth,
    workers
  }
});
