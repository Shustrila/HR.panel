import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import io from "socket.io-client";
import Cookies from "js-cookie";

const server = "http://localhost:3000/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        personalAccount: false,
        ioRooms: {},
        workers: [],
        userLogin: null,
        usersOnline: []
    },
    getters: {
        ioRoom(state) {
            return state.ioRooms;
        },
        getPersonalAccount(state) {
            return state.personalAccount;
        },
        getUserLogin(state) {
            return state.userLogin;
        },
        getUsersOnline(state) {
            return state.usersOnline;
        },
        getWorkers(state) {
            return state.workers;
        }
    },
    mutations: {
        addIoRoom(state, payload) {
            state.ioRooms[payload.name] = payload.room;
        },
        loginUser(state, payload) {
            state.userLogin = payload;
        },
        personalAccount(state, payload) {
            state.personalAccount = payload;
        },
        setUsersOnline(state, payload) {
            state.usersOnline = payload;
        },
        setWorkers(state, payload) {
            state.workers = payload;
        }
    },
    actions: {
        login(context, payload) {
            axios.get(`${server}/v1/user/${payload.token}/${payload.refreshToken}`, {
                "Access-Control-Allow-Origin": "*"
            }).then(res => {
                if (res.data.status !== 400 || res.data.status !== 500) {
                    context.commit("loginUser", res.data);
                    context.commit("addIoRoom", {
                        name: "hrs",
                        room: io(`${server}hrs`)
                    });

                    context.dispatch("usersOnline");
                    context.dispatch("workers");
                }
            });
        },
        workers(context) {
            if (context.getters.getUserLogin !== null) {
                axios.get(`${server}/v1/worker`, {}, {
                    "Access-Control-Allow-Origin": "*"
                }).then((response) => {
                    context.commit("setWorkers", response.data);
                });
            }
        },
        changeWorker: function (context, payload) {
            switch (payload.type) {
                case "delete":
                    let url = `${server}/v1/worker/user/${payload.workerID}/${Cookies.get("auth_key")}`;

                    axios.put(url, {
                        "Access-Control-Allow-Origin": "*"
                    }).then(res => {
                        console.log(res);
                    });
                    break;
                case "change" :
                    let url = `${server}/v1/worker/user/${payload.workerID}`;

                    axios.put(url, {
                        "Access-Control-Allow-Origin": "*"
                    }).then(res => {
                        console.log(res);
                    });
                    break;
            }
        },
        usersOnline(context) {
            if (context.getters.getUserLogin !== null) {
                axios.get(`${server}/v1/users/${Cookies.get("auth_key")}`, {
                    "Access-Control-Allow-Origin": "*"
                }).then((response) => {
                    context.commit("setUsersOnline", response.data);
                });
            }
        }
    }
});
