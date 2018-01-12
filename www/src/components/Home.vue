<template>
    <div class="home">
        <!-- BEGINNING OF NAVBAR -->
        <nav class="navbar navbar-inverse navbar-fixed-top">
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
                    <p class="navbar-text">Welcome {{activeUser.name}}</p>
                    <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal3" @click="validateForm">Create Event</button>
                    <button type="button" class="btn btn-danger navbar-btn logout-btn" @click="logout">Logout</button>
                </div>
                <div class="text-right" v-else>
                    <button type="button" class="btn btn-primary navbar-btn " data-toggle="modal" data-target="#myModal">Login</button>
                    <button type="button" class="btn btn-success navbar-btn" data-toggle="modal" data-target="#myModal2">Sign-up</button>
                </div>
            </div>

            <!-- MENU DROWDOWN -->
            <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">
                <ul>
                    <li>
                        <router-link :to="{name: 'findEvents'}">
                            <button type="button" class="btn btn-default nav-drop-btn">Find Events</button>
                        </router-link>
                    </li>
                    <div v-if="activeUser.hasOwnProperty('name')">
                        <li>
                            <router-link :to="{name: 'adminEvents'}">
                                <button type="button" class="btn btn-default nav-drop-btn">Events I've Created</button>
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
        </nav>

        <div class="container-fluid bgimg-1">
            <div class="row main-heading">
                <div class="col-xs-12">
                    <h1 id="main-logo">CONFER</h1>
                </div>
                <div class="col-xs-12">
                    <h2>Conference Manager</h2>
                </div>
            </div>
            <div class="row login-field">
                <div v-if="!activeUser.name" class="col-xs-12">
                    <form class="form-inline">
                        <div id="force-inline" class="form-group">
                            <!-- <label for="email">Email address:</label> -->
                            <input type="email" maxlength="57" class="form-control" name="email" placeholder="Email" required v-model='login.email'>
                        </div>
                        <div id="force-inline" class="form-group">
                            <!-- <label for="password">Password:</label> -->
                            <input type="password" class="form-control" name="password" maxlength="20" placeholder="Password" required v-model='login.password'>
                            <button formnovalidate type="submit" class="btn btn-default front-login-btn" @click="submitLogin">LOGIN</button>
                        </div>
                    </form>
                </div>
                <div v-else class="col-xs-12">
                    <h1>Welcome Back,</h1>
                    <h2>{{activeUser.name}}</h2>
                    <router-link :to="{name: 'mySchedule'}">
                        <button type="button" class="btn btn-default my-sched-link">
                            My Schedule
                        </button>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="container-fluid text-responsive">
            <div class="row space-text extra-padding">
                <div class="col-xs-12 col-md-offset-3 col-md-6 col-md-offset-3">
                    <h1 style="font-family: 'Abril Fatface', cursive;">Confer</h1>
                    <h2> is a digital conference and event application that centralizes your event information in one place.</h2>
                </div>
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
                                <input type="email" maxlength="57" name="email" class="form-control" placeholder="Email" required v-model='login.email'>
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" name="password" maxlength="20" class="form-control" placeholder="password" required v-model='login.password'>
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
                                <input type="firstName" name="firstName" maxlength="20" class="form-control" placeholder="First Name" required v-model="signUp.firstName">
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name:</label>
                                <input type="lastName" name="lastName" maxlength="20" class="form-control" placeholder="Last Name" required v-model="signUp.lastName">
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" maxlength="57" name="email" class="form-control" placeholder="Email" required v-model="signUp.email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" name="password" maxlength="20" class="form-control" placeholder="password" required v-model="signUp.password">
                            </div>
                            <div class="form-group">
                                <label for="reEnterPassword">Re-enter Password:</label>
                                <input type="password" name="reEnterPassword" maxlength="20" class="form-control" placeholder="Re Enter Password" v-model="signUp.rPassword">
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
                                <input type="text" name="eventName" maxlength="40" class="form-control" placeholder="Whats the event called?" required v-model="event.name"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea type="text" name="description" maxlength="300" class="form-control" rows="5" placeholder="What is this event for?"
                                    required v-model="event.description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="logo">Logo:</label>
                                <input type="text" name="logo" class="form-control" maxlength="150" placeholder="Path or URL" required v-model="event.logo">
                            </div>
                            <div class="form-group">
                                <label for="startDate">Start Date:</label>
                                <input type="date" name="startDate" class="form-control" placeholder="Start Date" :min="date" v-model="event.startDate" required
                                    @change="validateForm">
                                <p class="error-message text-left text-danger" v-if="!this.validator.startDate">Start date must be today or later.</p>
                            </div>
                            <div class="form-group">
                                <label for="endDate">End Date:</label>
                                <input type="date" name="endDate" class="form-control" placeholder="End Date" :min="event.startDate" required v-model="event.endDate"
                                    @change="validateForm">
                                <p class="error-message text-left text-danger" v-if="!this.validator.endDate">End date must be the same as or later than the start date.</p>
                            </div>
                            <div class="form-group">
                                <label for="venue">Venue:</label>
                                <input type="text" name="venue" class="form-control" maxlength="40" placeholder="Venue" required v-model="event.venue">
                            </div>
                            <div class="form-group">
                                <label for="address">Address:</label>
                                <input type="text" name="address" class="form-control" maxlength="75" placeholder="Venue Address" v-model="event.address"
                                    required>
                                <input type="text" name="city" class="form-control" maxlength="75" placeholder="Venue City" v-model="event.city" required>
                                <div class="form-group state">
                                    <label for="state">Venue State</label>
                                    <select class="form-control state" v-model="event.state">
                                        <option :value="state" v-for="(postalCode, state) in locations">{{postalCode}} - {{state}}</option>
                                    </select>
                                </div>
                                <input type="number" name="zip" maxlength="5" class="form-control" placeholder="Venue Zip" v-model="event.zip" required @change="validateForm">
                                <p class="error-message text-left text-danger" v-if="!this.validator.zip">Zip code must be 5 characters long.</p>
                                <div class="form-group">
                                    <label for="timeZone">Time Zone</label>
                                    <select class="form-control" v-model="event.timeZone">
                                        <option :value="timeZone" v-for="timeZone in timeZones">{{timeZone}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-success" data-dismiss="modal" @click="createEvent" type="submit" :disabled="!this.validator.form">Create New Event</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>


        <!-- Pen & Paper picture -->
        <div class="container-fluid bgimg-2">
            <div class="row">
                <div class="col-xs-12 no-padding-xs extra-padding-md">
                    <h2>Sign up for a free account, create and join events</h2>
                    <h2>and add them to your personal schedule.</h2>
                </div>
            </div>
        </div>
        <div class="container-fluid body-text">
            <div class="row top-spacer space-text">
                <div class="col-md-12 col-lg-offset-1 col-lg-4 multi-text-one">
                    <h4>
                        Create an account to begin </h4>
                    <br>
                    <h4>By signing up you can join events, add activities to your schedule, and take notes</h4>
                </div>
                <div class="col-md-12 col-lg-offset-1 col-lg-4">
                    <img src="../assets/Optimized-computer.jpeg" class="multi-img-one my-img-responsive">
                </div>
            </div>
            <div class="row spacer off-section">
                <div class="col-md-12 col-lg-offset-1 col-lg-4">
                    <img src="../assets/Optimized-click.jpeg" class="multi-img-two my-img-responsive">
                </div>
                <div class="col-md-12 col-lg-offset-2 col-lg-4 multi-text-two">
                    <h4>
                        With an account you can build your event </h4>
                    <br>
                    <h4>Keep your event in 'private' mode while adding your activities, then click 'publish' to post it for the
                        world to see</h4>
                    <br>
                    <h4> You may edit your event at any time, whether in private or published modes</h4>
                </div>
            </div>
            <div class="row spacer space-text">
                <div class="col-md-12 col-lg-offset-1 col-lg-4 multi-text-three">
                    <h4>Create Activities on your events for your guests to join</h4>
                    <br>
                    <h4>Add collaborators to help edit your event, and allow speakers to edit their own activities</h4>
                    <br>
                    <h4>Post seating capacity to limit the size of an event, and enable your guests to reserve their seat by
                        joining the activity</h4>
                </div>
                <div class="col-md-12 col-lg-offset-1 col-lg-4">
                    <img src="../assets/Optimized-meeting.jpeg" class="multi-img-three my-img-responsive">
                </div>
            </div>
            <div class="row spacer off-section">
                <div class="col-md-12 col-lg-offset-1 col-lg-4">
                    <img src="../assets/Optimized-pen-paper.jpg" class="multi-img-four my-img-responsive">
                </div>
                <div class="col-md-12 col-lg-offset-2 col-lg-4 multi-text-four">
                    <h4>Add activities to your personal schedule to see your own agenda. Add and remove as your schedule changes</h4>
                    <br>
                    <h4>Take notes on activities you're in, or jot down general notes to remember. Both are stored on your user
                        account
                    </h4>
                    <h4>Stay organized and save vital information without carrying around a pen and paper</h4>
                </div>
            </div>

            <div class="row spacer space-text">
                <div class="col-xs-12">
                    <h3>
                        Create your free account and get started
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
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
                    timeZone: '',
                    logo: ''
                },
                validator: {
                    zip: false,
                    startDate: false,
                    endDate: false,
                    form: false
                }
            }
        },
        components: {
        },
        mounted() {
            this.$store.dispatch('authenticate')
            this.date = new Date().toJSON().split('T')[0];
        },
        computed: {
            activeUser() {
                return this.$store.state.activeUser
            },
            locations() {
                return this.$store.state.locations
            },
            timeZones() {
                return this.$store.state.timeZones
            }
        },
        methods: {
            validateZip() {
                this.validator.zip = (this.event.zip.length == 5)
            },
            validateStartDate() {
                this.validator.startDate = (new Date(this.event.startDate).getTime() >= new Date(this.date).getTime())
            },
            validateEndDate() {
                this.validator.endDate = (new Date(this.event.endDate).getTime() >= new Date(this.event.startDate).getTime())
            },
            validateForm() {
                this.validateZip()
                this.validateStartDate()
                this.validateEndDate()
                this.validator.form = (this.validator.zip && this.validator.startDate && this.validator.endDate)
                console.log('validator: ', this.validator)
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
            createEvent() {
                this.validateForm()
                if (this.validator.form) {
                    this.$store.dispatch('createEvent', { event: this.event, user: this.activeUser })
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
                        timeZone: ''
                    }
                }

            }
        }
    }
</script>

<style>
    .home {
        height: 100%;
        margin: 0;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center
    }

    @media screen and (min-width: 500px) {
        #main-logo {
            font-size: 150px;
        }
    }

    @media screen and (min-width: 500px) {
        #second-logo {
            font-size: 100px;
        }
    }

    @media screen and (max-width: 500px) {
        .no-padding-xs {
            position: absolute;
            left: 0;
            top: 10%;
            width: 100%;
            text-align: center;
            color: white;
            font-family: 'Lato', sans-serif;
            font-size: 50px;
            letter-spacing: 10px;
        }
    }

    @media screen and (min-width: 501px) {
        .extra-padding-md {
            position: absolute;
            left: 0;
            top: 20%;
            width: 100%;
            text-align: center;
            color: white;
            font-family: 'Lato', sans-serif;
            font-size: 50px;
            letter-spacing: 10px;
            padding: 50px 80px;
        }
    }

    /* BACKGROUND PHOTOS */

    .bgimg-1,
    .bgimg-2,
    .bgimg-3 {
        position: relative;
        opacity: 0.65;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .bgimg-1 {
        background-image: url('../assets/Optimized-confer-main-photo.jpg');
        min-height: 1000px;
        margin-top: -45px;
    }

    .bgimg-2 {
        background-image: url('../assets/Optimized-conference.jpeg');
        min-height: 400px;
    }

    .bgimg-3 {
        background-image: url("https://images.unsplash.com/38/awhCbhLqRceCdjcPQUnn_IMG_0249.jpg?dpr=1&auto=format&fit=crop&w=967&q=60&cs=tinysrgb");
        min-height: 400px;
    }

    @media screen and (min-width: 500px) {
        #main-logo {
            font-size: 150px;
        }
    }

    @media screen and (max-width: 500px) {
        .my-img-responsive {
            display: block;
            max-width: 100%;
            height: auto;
        }
    }

    .caption {
        position: absolute;
        left: 0;
        top: 20%;
        width: 100%;
        text-align: center;
        color: white;
        font-family: 'Lato', sans-serif;
        padding: 18px;
        font-size: 50px;
        letter-spacing: 10px;
    }

    .space-text {
        color: #fff;
        background-color: #111;
        font-family: 'Lato', sans-serif;
        letter-spacing: 5px;
    }

    .off-section {
        color: black;
        background-color: white;
        font-family: 'Lato', sans-serif;
        letter-spacing: 5px;
    }

    .extra-padding {
        padding: 50px 80px;
    }

    .spacer {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .top-spacer {
        margin-bottom: 10px;
    }

    .main-heading {
        font-family: 'Abril Fatface', cursive;
        text-shadow: 0px 0px 35px black;
        color: white;
        margin-top: 275px;
    }

    .btn-default {
        width: 100%;
    }

    .screenshot {
        margin-left: 50px;
    }

    .navbar ul {
        list-style-type: none;
    }

    .logout-btn {
        margin-left: 2px;
    }

    @media (max-width: 2000px) {
        .navbar-header {
            float: none;
        }
        .navbar-toggle {
            display: block;
        }
        .navbar-collapse {
            border-top: 1px solid transparent;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .navbar-collapse.collapse {
            display: none!important;
        }
        .navbar-collapse.collapse.in {
            display: block!important;
        }
        .navbar-nav {
            float: none!important;
            margin: 7.5px -15px;
        }
        .navbar-nav>li {
            float: none;
        }
        .navbar-nav>li>a {
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .state {
            width: 50%
        }
        .nav-drop-btn {
            width: 90%;
            background-color: #FFFFF9;
            margin: 2px;
            font: black;
        }
        /* .multi-img-one {
            margin-top: -50px;
            margin-bottom: -10px;
        } */
        .multi-img-two {
            margin-top: -10px;
            margin-bottom: -10px;
        }
        /* .multi-img-three {
            
        } */
        .multi-img-four {
            margin-top: -10px;
            margin-bottom: -10px;
        }

        .multi-text {
            padding-top: 50px;
            padding-bottom: 10px;
        }

        .multi-text-one {
            padding-top: 100px;
            padding-bottom: 50px;
        }

        .multi-text-two {
            padding-top: 75px;
            padding-bottom: 50px;
        }

        .multi-text-three {
            padding-top: 60px;
            padding-bottom: 50px;
        }

        .multi-text-four {
            padding-top: 70px;
            padding-bottom: 50px;
        }

        .login-field {
            margin-top: 250px;
            font-family: 'Lato', sans-serif;
            color: white;
            font-size: 20px;
        }

        .front-login-btn {
            width: 10%;
        }

        #force-inline {
            display: inline;
        }

        .my-sched-link {
            width: 15%;
            color: black;
            font-family: 'Lato', sans-serif;
        }
    }
</style>