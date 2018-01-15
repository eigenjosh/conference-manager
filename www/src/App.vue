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
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
    padding-top: 50px;
  }

  @media (max-width: 800px) {
    #app {
      font-family: 'Lato', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: black;
      padding-top: 100px;
    }
  }

  /* .word-wrap {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } */

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

  a {
    text-shadow: 2px 2px 4px black;
    color: white;
  }

  a:hover {
    text-shadow: 4px 4px 10px black;
    color: white;
  }

  .event-btn {
    margin-bottom: 50px;
    border: black 1px solid;
  }

  .nav-btn-defaults {
    width: 10%;
    background-color: lightgray;
    color: black;
  }

  .body-text {
    font-family: 'Lato', sans-serif;
  }

  .btn-square {
    border-radius: 0;
  }

  .login-color {
    background-color: #a6c7e2;
    color: black;
  }

  .submit-color {
    background-color: #a6c7e2;
    color: black;
    font-family: 'Lato', sans-serif;
    border: black;
    letter-spacing: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
  }

  .register-color {
    background-color: #c195a5;
    color: black;
  }

  .create-color {
    background-color: #a6c7e2;
    color: black;
  }

  .logout-color {
    background-color: #6d6b6bb5;
    color: white;
  }

  .logout-color:hover {
    background-color: red;
    color: white;
  }

  /* BIG SCREEN MODALS */

  @media (min-width: 1201px) {
    .user-modal-dialog {
      height: 100%;
      width: 100%;
      /* margin-left: 5%; */
      /* margin-right: 5%; */
      padding-bottom: 5%;
      padding: 0;
      vertical-align: middle;

    }
    .event-modal-dialog {
      width: 70%;
      height: 70%;
      padding: 0;
      vertical-align: middle;
    }
    .modal-body {
      height: auto;
      min-height: 100%;
      border-radius: 0;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 100px;
      padding-right: 100px;
      background-color: white;
      color: black;
      font-family: 'Lato', sans-serif;
      letter-spacing: 5px;
    }
    .modal-header {
      font-family: 'Lato', sans-serif;
      letter-spacing: 5px;
    }
  }

  .modal-content {
    height: auto;
    min-height: 100%;
    border-radius: 0;
  }

  .modal-space {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  /* SMALL SCREEN MODALS */

  @media (max-width: 1200px) {
    .modal-dialog {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .modal-body {
      height: auto;
      min-height: 100%;
      border-radius: 0;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 100px;
      padding-right: 100px;
      background-color: white;
      color: black;
      font-family: 'Lato', sans-serif;
      letter-spacing: 5px;
    }
    .modal-header {
      font-family: 'Lato', sans-serif;
      letter-spacing: 5px;
    }
  }

  .modal-content {
    height: auto;
    min-height: 100%;
    border-radius: 0;
  }

  .modal-space {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .xs-modal-space {
    padding-bottom: 50px;
  }

  .fe-btn {
    background-color: black;
    color: white;
    font-family: 'Lato', sans-serif;
    border: black;
    letter-spacing: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 10px;
  }

  .fe-btn:hover {
    box-shadow: 1px 1px 1px 1px white;
  }

  @media (min-width: 600px) {
    .lt-btn {
      background-color: white;
      color: black;
      font-family: 'Lato', sans-serif;
      border: solid 5px black;
      letter-spacing: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 20px;
      padding-right: 10px;
    }

    .lt-btn:hover {
      box-shadow: 5px 5px 5px 2px black;
    }
  }

  @media (max-width: 601px) {
    .lt-btn {
      background-color: white;
      color: black;
      font-family: 'Lato', sans-serif;
      border: solid 5px black;
      /* letter-spacing: 10px; */
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 20px;
      padding-right: 10px;
    }

    .lt-btn:hover {
      box-shadow: 5px 5px 5px 2px black;
    }
  }



  .better-text {
    font-family: 'Lato', sans-serif;
    letter-spacing: 10px;
  }

  hr {
    border-top: 5px solid darkgray;
    height: 50px;
  }
</style>