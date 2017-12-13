<template>
    <div class="find-events">
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
                        <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal3">Create Event</button>
                        <button type="button" class="btn btn-danger navbar-btn" @click="logout">Logout</button>
                    </div>
                    <div class="text-right" v-else>
                        <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal">Login</button>
                        <button type="button" class="btn btn-success navbar-btn" data-toggle="modal" data-target="#myModal2">Sign-up</button>
                    </div>
                    <!-- Trigger the SIGN UP modal -->
                </div>

                <!-- MENU DROPDOWN -->
                <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">

                    <ul>
                        <li>

                            <router-link :to="{name: 'findEvents'}">
                                <button type="button" class="btn btn-default">Find Events</button>
                            </router-link>
                        </li>
                        <!-- <li>
    
                                <router-link :to="{name: 'eventSchedule'}">
                                    <button type="button" class="btn btn-default">Event Schedule</button>
                                </router-link>
                            </li> -->

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
        <div class="container-fluid">
            <h1>Find Events</h1>
            <form id="find-events" class="form" @submit.prevent="findEvents">
                <div class="form-group">
                    <label for="location">Location:</label>
                    <input type="text" name="text" class="form-control" placeholder="Location" required v-model='search.location'>
                </div>
                <div class="form-group">
                    <button class="btn btn-submit btn-success" type="submit">Submit</button>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-danger" @click="getAllEvents">View All Events</button>
                </div>
            </form>
            <div v-for="event in events" class="row event-row">
                <event :event="event"></event>
            </div>
        </div>

        <!-- LOGIN MODAL -->

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
                        <form id="register" class="form">
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
        <!-- Create new event modal -->
        <div id="myModal3" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Create a New Event</h4>

                    </div>
                    <div class="modal-body">
                        <form id="createEvent" class="form">
                            <div class="form-group">
                                <label for="eventName">Event Name</label>
                                <input type="text" name="eventName" class="form-control" placeholder="Whats the event called?" required v-model="event.name"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea type="text" name="description" class="form-control" rows="5" placeholder="What is this event for?" required v-model="event.description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="startDate">Start Date:</label>
                                <input type="date" name="startDate" class="form-control" placeholder="Start Date" :min="date" required v-model="event.startDate"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="endDate">End Date:</label>
                                <input type="date" name="endDate" class="form-control" placeholder="End Date" :min="event.startDate" required v-model="event.endDate">
                            </div>
                            <div class="form-group">
                                <label for="venue">Venue:</label>
                                <input type="text" name="venue" class="form-control" placeholder="Venue" required v-model="event.venue">
                            </div>
                            <div class="form-group">
                                <label for="address">Address:</label>
                                <input type="text" name="address" class="form-control" placeholder="Venue Address" v-model="event.address" required>
                                <input type="text" name="city" class="form-control" placeholder="Venue City" v-model="event.city" required>
                                <input type="text" name="state" class="form-control" placeholder="Venue State" v-model="event.state" required>
                                <input type="text" name="zip" class="form-control" placeholder="Venue Zip" v-model="event.zip" required>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-success" data-dismiss="modal" @click="createEvent" type="submit">Create New Event</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import Event from './event'
    export default {
        name: 'findEvents',
        data() {
            return {
                date: Date,
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
                event: {
                    name: '',
                    description: '',
                    venue: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    startDate: '',
                    endDate: '',
                    created: Date.now()
                },
                search: {
                    location: ''
                }
            }
        },
        components: {
            Event
        },
        mounted() {
            this.$store.dispatch('authenticate')
            this.date = new Date().toJSON().split('T')[0];
            this.$store.dispatch('getAllEvents')
        },
        computed: {
            activeUser() {
                return this.$store.state.activeUser
            },
            events() {
                return this.$store.state.events
            }
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
            
            findEvents() {
                this.$store.dispatch('findEvents', this.search.location)
                this.search.location = ''
            },
            getAllEvents() {
                this.$store.dispatch('getAllEvents')
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
            createEvent() {
                //console.log(this.event)
                this.$store.dispatch('createEvent', this.event)
                this.event = {
                    name: '',
                    description: '',
                    venue: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    startDate: '',
                    endDate: '',
                    created: Date.now()
                }

            }
        }
    }
</script>

<style scoped>
    
    .event-btn{
        width: 100%;
    }
</style>