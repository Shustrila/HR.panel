<template>
  <div id="app">
    <app-header/>
    <div class="content">
        <router-view/>
        <user-list/>
        <personal-account v-if="personalAccount"/>
    </div>
  </div>
</template>

<script>
  export default {
      name: "App",
      data () {
        return {
            personalAccount: this.$store.state.personalAccount
        }
      },
      components: {
          appHeader: () => import('./components/Header'),
          UserList: () => import('./components/UserList'),
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
