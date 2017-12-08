<template>
    <div class="event-schedule">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand">Confer</a>
                    <div class="text-right" v-if="activeUser.hasOwnProperty('name')">
                        <button type="button" class="btn btn-danger navbar-btn" @click="logout">Logout</button>
                    </div>
                    <div class="text-right" v-else>
                        <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal">Login</button>
                        <button type="button" class="btn btn-success navbar-btn" data-toggle="modal" data-target="#myModal2">Sign-up</button>
                    </div>
                    <!-- Trigger the SIGN UP modal -->
                </div>

                <!-- MENU DROWDOWN -->
                <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">

                    <ul>
                        <li>

                            <router-link :to="{name: 'Home'}">
                                <button type="button" class="btn btn-default">Home</button>
                            </router-link>
                        </li>
                        <li>

                            <router-link :to="{name: 'findEvents'}">
                                <button type="button" class="btn btn-default">Find Events</button>
                            </router-link>
                        </li>

                        <div v-if="activeUser.hasOwnProperty('name')">
                            <li>

                                <router-link :to="{name:'mySchedule'}">
                                    <button type="button" class="btn btn-default">My Schedule</button>
                                </router-link>
                            </li>
                            <li>

                                <router-link :to="{name:'userNotes'}">
                                    <button type="button" class="btn btn-default">My Notes</button>
                                </router-link>
                            </li>

                        </div>

                    </ul>


                    <!-- SEARCH BAR -->

                    <ul class="nav navbar-nav navbar-right">
                        <!-- LOGIN BUTTON -->

                        <!-- Trigger the LOGIN modal -->
                        <!-- Trigger the SIGN UP modal -->



                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>

        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Sign in to your account</h4>
                    </div>
                    <div class="modal-body">
                        <form id="login" class="form">
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" name="email" class="form-control" placeholder="Email" required v-model='login.email'>
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" name="password" class="form-control" placeholder="password" required v-model='login.password'>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-success" @click="submitLogin" data-dismiss="modal" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

        <!-- SIGN UP MODAL -->

        <div id="myModal2" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Create a Confer Account</h4>
                        <p v-if="error">
                            <b>Your Passwords Do Not Match</b>
                        </p>
                    </div>
                    <div class="modal-body">
                        <form id="login" class="form">
                            <div class="form-group">
                                <label for="firstName">First Name:</label>
                                <input type="firstName" name="firstName" class="form-control" placeholder="First Name" required v-model="signUp.firstName">
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name:</label>
                                <input type="lastName" name="lastName" class="form-control" placeholder="Last Name" required v-model="signUp.lastName">
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" name="email" class="form-control" placeholder="Email" required v-model="signUp.email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" name="password" class="form-control" placeholder="password" required v-model="signUp.password">
                            </div>
                            <div class="form-group">
                                <label for="reEnterPassword">Re-enter Password:</label>
                                <input type="password" name="reEnterPassword" class="form-control" placeholder="Re Enter Password" v-model="signUp.rPassword">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-success" data-dismiss="modal" type="submit" @click="submitRegister">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>


        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-6">
                    <!-- <h2>{{activeEvent.name}}</h2> -->
                </div>
                <div class="col-xs-6 text-right"  >
                    <button class="btn btn-primary btn-lg">Join Event</button>
                </div>
                <div class="col-xs-6 text-right" >
                    <router-link :to="{name: 'adminEvent'}">
                        <button class="btn btn-warning btn-lg">Edit Schedule</button>
                    </router-link>
                    </div>
            </div>
            <div class="row" v-for="(timeDict, date) in schedule">
                <div class="col-xs-12 ">
                    <h3>{{date}}</h3>
                </div>
                <div class="row" v-for="(activitiesList, time) in schedule[date]">
                    <div class="col-xs-1 col-xs-offset-1">
                        <h3>{{time}}</h3>
                    </div>
                    <div class="col-xs-12 col-md-3" v-for="activity in activitiesList">
                        <button class="btn btn-primary activities">
                            <h5>{{activity.date}}  {{activity.startTime}} - {{activity.endTime}}</h5>
                            <h4>{{activity.name}}</h4>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'eventSchedule',
        data() {
            return {
                signUp: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    name: '',
                    password: '',
                    rPassword: ''
                },
                error: false,
                login: {
                    email: '',
                    password: ''
                }

            }
        },
        mounted(){
            this.$store.dispatch('getEventById', this.event)
        },
        computed: {
            activeEvent(){
            this.$store.state.activeEvent
            },
            activeUser() {
                return this.$store.state.activeUser
            },
            schedule() {
                return this.$store.state.schedule
            },
            // activeEvent(){
            //     return this.$store.state.activeEvent
            // }
        },
        methods: {
            submitLogin() {
                debugger
                this.$store.dispatch('login', this.login)
                this.login = {
                    email: '',
                    password: ''
                }
            },
            submitRegister() {
                if (this.signUp.password == this.signUp.rPassword) {
                    this.signUp.name = this.signUp.firstName + ' ' + this.signUp.lastName
                    this.$store.dispatch('register', this.signUp)
                } else {
                    this.error = true
                    console.error({ error: "Passwords Do Not Match" })
                }
            },
            logout() {
                this.$store.dispatch('logout')
            }
        }
    }
</script>

<style>
    .activities{
        width:100%;
    }
</style>