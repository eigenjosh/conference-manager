<template>
    <div class="event-schedule sec-bg-img">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link :to="{name: 'Home'}">
                        <a class="navbar-brand" style="font-family: 'Abril Fatface', cursive">Confer</a>
                    </router-link>
                    <div class="text-right" v-if="activeUser.hasOwnProperty('name')">
                        <button type="button" class="btn logout-color navbar-btn logout-btn btn-square" @click="logout">Logout</button>
                    </div>
                    <div class="text-right" v-else>
                        <button type="button" class="btn login-color navbar-btn btn-square" data-toggle="modal" data-target="#myModal">Login</button>
                        <button type="button" class="btn register-color navbar-btn btn-square" data-toggle="modal" data-target="#myModal2">Sign-up</button>
                    </div>
                </div>

                <!-- MENU DROWDOWN -->
                <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">
                    <ul>
                        <li>
                            <router-link :to="{name: 'Home'}">
                                <button type="button" class="btn btn-default nav-drop-btn">Home</button>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'findEvents'}">
                                <button type="button" class="btn btn-default nav-drop-btn">Find Events</button>
                            </router-link>
                        </li>
                        <div v-if="activeUser.hasOwnProperty('name')">
                            <li>
                                <router-link :to="{name: 'adminEvents'}">
                                    <button type="button" class="btn btn-default nav-drop-btn">Edit Events</button>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'mySchedule'}">
                                    <button type="button" class="btn btn-default nav-drop-btn">My Schedule</button>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'userNotes'}">
                                    <button type="button" class="btn btn-default nav-drop-btn">My Notes</button>
                                </router-link>
                            </li>
                        </div>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                    </ul>
                </div>
            </div>
        </nav>
        <!-- LOGIN MODAL -->

        <div id="myModal" class="modal fade" role="dialog">
            <div class="user-modal-dialog modal-dialog">

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
                                <input type="email" maxlength="57" name="email" class="form-control" placeholder="Email" required v-model='login.email'>
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" name="password" maxlength="20" class="form-control" placeholder="password" required v-model='login.password'>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-default btn-square submit-color" @click="submitLogin" data-dismiss="modal" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div class="row">
                        <div class="col-xs-offset-3 col-xs-6">
                            <button type="button" class="btn btn-default btn-square" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- SIGN UP MODAL -->

        <div id="myModal2" class="modal fade" role="dialog">
            <div class="user-modal-dialog modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h1 class="modal-title">Create your Confer Account</h1>
                        <p v-if="error">
                            <b>Your Passwords Do Not Match</b>
                        </p>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-6 modal-space">
                                        <label for="firstName">First Name:</label>
                                        <input type="firstName" name="firstName" maxlength="20" class="form-control input-sm" placeholder="First Name" required v-model="signUp.firstName">
                                    </div>
                                    <div class="col-xs-6 modal-space">
                                        <label for="lastName">Last Name:</label>
                                        <input type="lastName" name="lastName" maxlength="20" class="form-control input-sm" placeholder="Last Name" required v-model="signUp.lastName">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <label for="email">Email:</label>
                                        <input type="email" maxlength="57" name="email" class="form-control input-sm" placeholder="Email" required v-model="signUp.email">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="password">Password:</label>
                                        <input type="password" name="password" maxlength="20" class="form-control" placeholder="password" required v-model="signUp.password">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="reEnterPassword">Re-enter Password:</label>
                                        <input type="password" name="reEnterPassword" maxlength="20" class="form-control" placeholder="Re Enter Password" v-model="signUp.rPassword">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <button class="btn btn-submit submit-color btn-square" data-dismiss="modal" type="submit" @click="submitRegister">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-offset-3 col-xs-6">
                            <button type="button" class="btn btn-default btn-square" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- ADD ACTIVITY MODAL -->
        <div id="addActivity" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">{{activeActivity.name}}</h2>
                    </div>
                    <div class="modal-body">
                        <h5>{{formatDateForDisplay(activeActivity.date)}}</h5>
                        <h5>{{activeActivity.startTime}} - {{activeActivity.endTime}}</h5>
                        <h4>Room: {{activeActivity.location}}</h4>
                        <h4>Speaker: {{activeActivity.speakerName}}</h4>
                        <h4>{{activeActivity.description}}</h4>
                        <h4 v-if="activeActivity.capacity">Seats Available: {{activeActivity.capacity}}</h4>
                    </div>
                    <div v-if="activeUser && activeUser.events">
                        <div v-if="activeUser.events.includes(activeEvent._id)">
                            <button v-if="!activeUser.activities.includes(activeActivity._id) && (activeActivity.capacity > 0 || !activeActivity.capacity)"
                                @click="addToMySchedule" class="btn fe-btn btn-square bottom-sp">Add to My Schedule</button>
                            <h4 class="danger-text" v-else-if="activeActivity.capacity == 0 && activeActivity.capacity">Activity Full</h4>
                        </div>
                        <div v-if="activeUser.activities.includes(activeActivity._id)">
                            <h4 class="success-text">In My Schedule</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- START OF DISPLAY -->

        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <h1 class="main-headline">{{activeEvent.name}}</h1>
                </div>
                <div class="col-xs-12">
                    <img :src="activeEvent.logo" style="background-image: url(activeEvent.logo)">
                </div>
                <div class="col-xs-12 col-md-offset-3 col-md-6 desc-style">
                    <h3 class="text-center">{{activeEvent.description}}</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <h2>{{formatDateForDisplay(activeEvent.startDate)}} - {{formatDateForDisplay(activeEvent.endDate)}}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <h2>
                        <b>{{activeEvent.venue}}</b>
                    </h2>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <h3>{{activeEvent.address}}</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <h3>{{activeEvent.city}}, {{activeEvent.state}}</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <h4>{{activeEvent.zip}}</h4>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <h5>{{activeEvent.timeZone}} Time Zone</h5>
                </div>
            </div>
            <div v-if="activeUser && activeUser.events">
                <div class="col-xs-4 col-xs-offset-4 text-right" v-if="activeUser._id != activeEvent.creatorId && !activeEvent.collaborators.includes(activeUser._id)">
                    <button v-if="!activeUser.events.includes(activeEvent._id)" class="btn btn-default btn-lg join-btn" data-toggle="tooltip"
                        data-placement="top" title="Join event to add activities to your schedule!" @click="addToMyEvents">Join Event</button>
                    <h3 class="main-headline" style="margin-right: 30px; color: blue" v-if="joined">You have Joined this Event</h3>
                </div>
                <div class="col-xs-12 col-sm-offset-4 col-sm-4" v-else>
                    <router-link :to="{path: '/admin-edit/' + activeEvent._id}">
                        <button class="btn fe-btn bottom-spacer">Edit Event</button>
                    </router-link>
                    <router-link :to="{name: 'mySchedule'}">
                        <button class="btn fe-btn bottom-spacer">View My Schedule</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row" v-for="(timeDict, date) in schedule">
            <div class="col-xs-12 date-col">
                <h3>{{formatDateForDisplay(date)}}</h3>
            </div>
            <div class="row" v-for="(activitiesList, time) in schedule[date]">
                <div class="col-xs-6 col-xs-offset-1 col-md-1 time-col">
                    <h3>{{time}}</h3>
                </div>
                <div class="col-xs-12 col-md-9">
                    <div class="row button-list">
                        <div class="col-xs-12 col-md-4" v-for="activity in activitiesList">
                            <button class="btn btn-primary activities" @click="setActiveActivity(activity)" data-toggle="modal" data-target="#addActivity">
                                <h5>{{formatDateForDisplay(activity.date)}} {{activity.startTime}} - {{activity.endTime}}</h5>
                                <h4>{{activity.name}}</h4>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 bottom-buffer">
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
                },
                joined: false,
                activity: {
                    name: '',
                    description: '',
                    location: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    capacity: '',
                    speakerName: ''
                }

            }
        },
        mounted() {
            this.$store.dispatch('getEventById', { _id: this.$route.params.id })
            // this.$store.dispatch('getActivities', this.activeEvent)
        },
        computed: {
            activeEvent() {
                return this.$store.state.activeEvent
            },
            activeUser() {
                return this.$store.state.activeUser
            },
            schedule() {
                return this.$store.state.schedule
            },
            activeActivity() {
                return this.$store.state.activeActivity
            },
        },
        methods: {
            formatDateForDisplay(date) {
                if (date) {
                    var parts = date.split('-')
                    let newDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toLocaleString('en-US');
                    return newDate.split(',')[0]
                }
            },
            submitLogin() {

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
            },
            addToMyEvents() {
                if (!this.activeUser.events.includes(this.activeEvent._id)) {
                    this.$store.dispatch('addToMyEvents', { event: this.activeEvent, user: this.activeUser })
                }
                this.joined = true
            },
            setActiveActivity(activity) {
                this.$store.dispatch('getActivityById', activity)
                this.activity = activity
            },
            addToMySchedule() {
                if (this.activeActivity.capacity) {
                    this.activeActivity.capacity--
                    this.$store.dispatch('editActivity', { activity: this.activeActivity, emit: true })
                }
                this.$store.dispatch('addToMySchedule', { activity: this.activeActivity, user: this.activeUser })
            }
        }
    }
</script>

<style>
    .sec-bg-img {
        background-image: url('../assets/light-bg.jpeg');
        position: relative;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 1000px;
    }

    .desc-style {
        border: 5px solid black;
        letter-spacing: 5px;
        background-color: black;
        color: white;
    }

    .bottom-spacer {
        margin-bottom: 20px;
    }
</style>