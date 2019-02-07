import axios from "axios";
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state: {
    validation: {
      login: {},
      registration: {}
    },
    user: {}
  },
  actions: {
    login({ commit }, payload) {
      return axios.post("//localhost:3000/api/v1/user/login", payload);
    },
    registration({ commit }, payload) {
      return axios.post("//localhost:3000/api/v1/user/registration", payload);
    },
    user({ commit }) {
      const token = Cookies.get("auth_key");
      const refreshToken = Cookies.get("refresh_key");

      return axios.get(`//localhost:3000/api/v1/user/${token}/${refreshToken}`)
        .then((res) => {
          commit("setUserOnlone", res.data);
        });
    }
  },
  mutations: {
    errorValiationForm: (state, { type, data }) => state.validation[type] = data,
    setUserOnlone: (state, payload) => state.user = payload
  },
  getters: {
    valiationErrors: state => state.validation,
    userLogin: state => state.user
  }
};
