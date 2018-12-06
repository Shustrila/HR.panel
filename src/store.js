import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    personalAccount: true,
    userLogin: {
      name: 'ivan',
      surname: 'ivanov',
      fullname: 'ivan ivanov',
        email: 'ivan.ivanov@gmail.com'
    },
    usersList: [
        {
          id: 1,
          fullname: 'Denis Utkin',
          email: 'denis.utkin@mail.com',
          photo: ''
        },
        {
            id: 2,
            fullname: 'Lika Galchinskaya',
            email: 'lika.galchinskaya@mail.com',
            photo: ''
        },
        {
            id: 3,
            fullname: 'Max Chernenkov',
            email: 'max.chernenkov@mail.com',
            photo: ''
        }
    ]
  },
  mutations: {

  },
  actions: {

  }
})
