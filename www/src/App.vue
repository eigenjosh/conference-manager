<template>
  <div id="app">
    <router-view></router-view>
    <!-- <error></error> -->
  </div>
</template>

<script>
  import Error from './components/Error'
  export default {
    name: 'app',
    components: {
      Error
    },
    mounted() {
      this.$store.dispatch('authenticate')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    
  }
  .word-wrap {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } 
</style>