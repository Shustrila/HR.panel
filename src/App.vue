<template>
    <div id="app">
        <app-header/>
        <div class="content">
            <router-view/>
            <user-list/>
            <personal-account v-if="$store.state.personalAccount"/>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Cookies from 'js-cookie';
export default {
    name: "App",
    data () {
        return {
            userLogin: null,
            userList: null
        }
    },
    components: {
        appHeader: () => import('./components/Header'),
        UserList: () => import('./components/UserList'),
        PersonalAccount: () => import('./components/PersonalAccount')
    },
    beforeCreate () {
        let email    = Cookies.get("_email");
        let password = Cookies.get("_password");

        axios.get(`/api/user/${email}`)
             .then(response => this.userLogin = response.data);

        axios.get("/api/users")
             .then(response => this.userLogin = response.data);

        this.$store.dispatch({
            type: "login",
            userLogin: this.userLogin,
            userList: this.userList
        });
    }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html, body{
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content{
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}
</style>
