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
import axios from "axios";
import Cookies from 'js-cookie';

export default {
    name: "App",
    data () {
        return {
            errored: false,
            workers: [],
        }
    },
    components: {
        appHeader: () => import('./components/Header'),
        UserList: () => import('./components/UserList'),
        PersonalAccount: () => import('./components/PersonalAccount')
    },
    mounted () {
        let token = Cookies.get("outh_key");

        if(token !== undefined || token !== "") {
            axios.get(`http://localhost:3000/api/user/${token}`, {}, {
                "Access-Control-Allow-Origin": "*"
            }).then(response => {
                    console.log(response.data);
                    this.$store.dispatch("login", response.data);
            }).catch(error => {
                console.log(error);
            });

            // axios.get(`http://localhost:3000/api/users`, {}, {
            //     "Access-Control-Allow-Origin": "*"
            // }).then(response => {
            //     this.$store.dispatch("usersOnline", response.data);
            // }).catch(error => {
            //     console.log(error);
            // });
        }
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

@keyframes slideInDown {
    0%{
        opacity: 0;
        transform: translateY(-10px);
    }
    100%{
        opacity: 1;
        transform: translateY(0);
    }
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
