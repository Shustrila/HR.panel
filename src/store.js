import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        personalAccount: false,
        workers: [],
        userLogin: null,
        usersOnline: null
    },
    mutations: {
        loginUser (state, payload) {
            state.userLogin = payload;
        },
        personalAccount (state, payload) {
            state.personalAccount = payload;
        },
        usersOnline (state, payload) {
            state.usersOnline = payload;
        },
        setWorkers (state, payload) {
            state.workers = payload;
        }
    },
    actions: {
        login (context, payload) {
            context.commit("loginUser", payload)
        }
    }
});
