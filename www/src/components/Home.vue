<template>
    <div class="home container-fluid parralax">
        <!-- BEGINNING OF NAVBAR -->
        <nav class="navbar navbar-inverse">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" style="font-family: 'Abril Fatface', cursive">Confer</a>
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
        <div class="jumbotron main-heading main-pic">
            <div class="row">
                <div class="col-xs-12">
                    <h1 style="font-size: 150px">CONFER</h1>
                    <h3 style="font-size: 30px">Digital Conference Manager</h3>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-offset-3 col-xs-6 col-xs-offset-3 main-headline text-justify">
                <h3>A digital conference website that centralizes your event information in one place.</h3>
                  
                    <h3>Keeps your conferences stream-lined and stress free with Confer.</h3>
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
                                <input type="text" name="logo" class="form-control" maxlength="80" placeholder="Path or URL" required v-model="event.logo">
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

        <div class="jumbotron second-pic">
        </div>
        <div class="row">
            <div class="col-xs-offset-3 col-xs-6 col-xs-offset-3 text-justify">
                <h3>
                    <b>| Create an account to build your event! Once you have an account you are able to join events, add activities
                        to your schedule, and create notes.</b>
                </h3>
                <br>

                <h3>
                    <b>| When Creating an Event, you are able to keep it in 'private' mode while adding activities, then click
                        'publish' to post it to the site. You may edit your event at any time, whether in private or published
                        modes.
                    </b>
                </h3>
                <br>
                <h3>
                    <b>| Activities are able to be created with Seating Capacity, and as guests add your activities the seats
                        will fill. Once full, the activity will close for registration and display as full. Guests have the
                        ability to drop the event, thus opening seats for the event activity back up to registrants.</b>
                </h3>
                <br>
                <h3>
                    <b>| Notes are stored on your user account, and can be created generally or tied to a specific event, thus
                        allowing you and your guests to stay organized and jot down vital information without a pen and paper.</b>
                </h3>
                <br>
                <h3>
                    <b>| Create your free account and get started!</b>
                </h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3 col-md-offset-1 well">
                <h3></h3>
                <div class="thumbnail">
                    <a>
                        <img src="../assets/Optimized-Events.png">
                    </a>
                    <div class="caption">
                        <h5></h5>
                    </div>
                </div>
            </div>
            <div class="col-md-3 well screenshot">
                <h3></h3>
                <div class="thumbnail">
                    <a>
                        <img src="../assets/Optimized-notes.png">
                    </a>
                    <div class="caption">
                        <h5></h5>
                    </div>
                </div>
            </div>
            <div class="col-md-3 well screenshot">
                <h3></h3>
                <div class="thumbnail">
                    <a>
                        <img src="../assets/Optimized-schedule.png">
                    </a>
                    <div class="caption">
                        <h5></h5>
                    </div>
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
        background-image: url('https://bhubaneswarlive.com/wp-content/uploads/2016/11/Savin-NY-Website-Background-Web.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center
    }

    .well {
        background: rgb(127, 127, 127)
    }

    .navbar {
        background: black;
        font: white;
    }

    /* .parallax {
        The image used
        background-image: url("https://images.pexels.com/photos/34092/pexels-photo.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb");

        Set a specific height
        height: 500px;

        Create the parallax scrolling effect
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    } */

    .main-pic {
        background-image: url('https://images.pexels.com/photos/34092/pexels-photo.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .main-heading {
        font-family: 'Abril Fatface', cursive;
        text-shadow: 0px 0px 15px black;
        color: white;
    }

    .second-pic {
        /* margin-top: 300px; */
        height: 300px;
        background-image: url('https://i.pinimg.com/originals/50/1f/1a/501f1a19290e28cd676605f9acf36d03.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .info-text {
        font-family: 'Source Sans Pro', sans-serif;
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

    }
</style>