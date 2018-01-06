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
    font-family: 'Source Sans Pro', sans-serif;
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

  .navbar-inverse .navbar-brand {
    color: white;
  }

  .navbar {
    background: black;
    font: white;
  }

  .nav-drop-btn {
    width: 90%;
    background-color: #FFFFF9;
    margin: 2px;
    font: black;
  }

  .navbar-brand {
    font-size: 50px;
  }

  .navbar-inverse .navbar-text {
    color: white;
    font-size: 20px;
  }

  .date-col {
    padding-left: 40px;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    background: black;
    color: white;
  }

  .activities {
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: lightslategrey;
    color: white;
  }

  .event-name-btn {
    background-color: darkslategrey;
    height: 100%;
    width: 100%;
    /* color: black; */
  }

  .main-headline {
    font-family: 'Abril Fatface', cursive;
    margin-bottom: 100px;
  }

  .a-pointer {
    cursor: pointer;
  }

  .event-btn {
    width: 100%;
    background-color: lightgray;
    margin-bottom: 10px;
    border: black 1px solid;
  }

  .nav-btn-defaults {
    width: 10%;
    background-color: lightgray;
    color: black;
  }
</style>