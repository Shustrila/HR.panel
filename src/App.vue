<template>
    <div id="app">

        <app-header v-cloak/>
        <div class="content js-content">
            <router-view/>
            <users-list/>
            <personal-account v-if="$store.getters.personalAccount"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    data () {
        return {

        }
    },
    components: {
        appHeader: () => import('./components/Header'),
        UsersList: () => import('./components/users/UsersList'),
        PersonalAccount: () => import('./components/PersonalAccount')
    }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

[v-cloak]{
    display: none;
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
    position: absolute;
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
}
.content{
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}
</style>
