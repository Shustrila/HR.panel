import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import io from 'socket.io-client';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        personalAccount: false,
        workers: [],
        userLogin: null,
        usersOnline: []
    },
    getters: {
        getPersonalAccount (state) {
            return state.personalAccount
        },
        getUserLogin (state) {
            return state.userLogin
        },
        getUsersOnline (state) {
            return state.usersOnline
        },
        getWorkers (state) {
            return state.workers
        }
    },
    mutations: {
        loginUser (state, payload) {
            state.userLogin = payload;
        },
        personalAccount (state, payload) {
            state.personalAccount = payload;
        },
        setUsersOnline (state, payload) {
            state.usersOnline = payload;
        },
        setWorkers (state, payload) {
            state.workers = payload;
        }
    },
    actions: {
        login (context, payload) {
            axios.get(`http://localhost:3000/api/v1/user/${payload.token}/${payload.refreshToken}`,{
                "Access-Control-Allow-Origin": "*"
            }).then(response => {
                context.commit("loginUser", response.data);

                context.dispatch("usersOnline");
                context.dispatch("workers");

                if(payload.token) {
                    let sokets = io.connect("http://localhost:3000");

                    sokets.emit("online", { token: payload.token });
                }
            })
        },
        usersOnline (context) {
            if(context.getters.getUserLogin !== null){
                axios.get("http://localhost:3000/api/v1/users",{
                    "Access-Control-Allow-Origin": "*"
                }).then(response => {
                    context.commit("setUsersOnline", response.data);
                })
            }
        },
        workers (context) {
            if(context.getters.getUserLogin !== null){
                axios.get(`http://localhost:3000/api/v1/worker`, {}, {
                    "Access-Control-Allow-Origin": "*"
                }).then(response => {
                    context.commit('setWorkers', response.data);
                })
            }
        }
    }
});
