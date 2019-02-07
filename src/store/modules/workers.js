import axios from "axios";
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state: {
    list: []
  },
  action: {
    getWorkers(commit) {
      axios.get("//localhost:3000/api/v1/worker")
        .then((res) => {
          commit("setWorkersList", res.data);
        });
    },
    newWorkers() {
      axios.post();
    },
    updateWorkers() {
      axios.put();
    },
    deleteWorkers() {
      axios.delete();
    }
  },
  mutations: {
    setWorkersList: (state, payload) => state.list = payload
  },
  getters: {
    list: state => state.list
  }
};
