import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    personalAccount: false,
    userLogin: null,
    usersList: null
  },
  getters: {
  },
  mutations: {
      loginUser (state, payload) {
           return state.userLogin = payload;
      },
      usersList (state, payload) {
          let usersOnline = payload.filter( user => {
              return user.email !== state.userLogin.email
          });

          return state.usersList = (usersOnline !== undefined)? usersOnline: false;
      },
      personalAccount (state, payload) {
          return state.personalAccount = payload;
      }
  },
  actions: {
      login (context, payload) {
          if(payload.userLogin !== undefined){
              console.log(payload);
              context.commit('loginUser', );
              context.commit('usersList', );
          }else{
              console.log('узер залогинелся');
          }
      }
  }
})
