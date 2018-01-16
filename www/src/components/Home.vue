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
                    <p class="navbar-text">Hi, {{activeUser.name}}</p>
                    <button type="button" class="btn create-color navbar-btn btn-square" data-toggle="modal" data-target="#myModal3" @click="validateForm">Create Event</button>
                    <button type="button" class="btn logout-color navbar-btn logout-btn btn-square" @click="logout">Logout</button>
                </div>
                <div class="text-right" v-else>
                    <button type="button" class="btn login-color navbar-btn btn-square" data-toggle="modal" data-target="#myModal" >Login</button>
                    <button type="button" class="btn register-color navbar-btn btn-square" data-toggle="modal" data-target="#myModal2">Sign-up</button>
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

            <!-- FRONT PAGE LOGIN/GREETING -->

            <div class="row login-field">
                <div v-if="!activeUser.name" class="col-xs-12">
                    <form class="form-inline">
                        <div id="force-inline" class="form-group">
                            <input type="email" maxlength="57" class="form-control btn-square" name="email" placeholder="Email" required v-model='login.email'>
                        </div>
                        <div id="force-inline" class="form-group">
                            <input type="password" class="form-control btn-square" name="password" maxlength="20" placeholder="Password" required v-model='login.password'>
                            <button formnovalidate type="submit" class="btn btn-default front-login-btn" @click="submitLogin">
                                <span class="glyphicon glyphicon-log-in"></span>
                            </button>
                        </div>
                    </form>
                    <div v-if="handledError == 'Invalid Email or Password'">{{handledError}}</div>
                    <h3 class="shadow">Don't have an account yet?
                        <a class="a-pointer" data-toggle="modal" data-target="#myModal2">Click Here to Get Started</a>
                    </h3>
                </div>
                <div v-else class="col-xs-12">
                    <h1 class="welcome">Welcome Back,</h1>
                    <h2 class="welcome">{{activeUser.name}}</h2>
                    <router-link :to="{name: 'mySchedule'}">
                        <button type="button" class="btn-square fe-btn">
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
                                <button class="btn btn-submit btn-default btn-square submit-color" type="submit"@click="submitLogin">Submit</button>
                            </div>
                            <div v-if="handledError == 'Invalid Email or Password'">
                                <h4>{{handledError}}</h4>
                            </div>
                            <div v-else-if="success == 'successfully logged in'" v-on:mousemove="closeModal()">
                                <h4>{{success}}</h4>
                            </div>
                            <div v-else></div>
                            <!-- <div class="form-group" v-else>
                                <button class="btn btn-submit btn-default btn-square submit-color" @click="submitLogin" data-dismiss="modal" type="submit">Submit</button>
                            </div> -->

                        </form>
                    </div>
                    <div class="row">
                        <div class="col-xs-offset-3 col-xs-6">
                            <!-- <div class="modal-footer"> -->
                            <button type="button" class="btn btn-default btn-square" data-dismiss="modal">Close</button>
                            <!-- </div> -->
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
                            <!-- <form id="register" class="form"> -->
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
                            <!-- <div class="modal-footer"> -->
                            <button type="button" class="btn btn-default btn-square" data-dismiss="modal">Close</button>
                            <!-- </div> -->
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- CREATE NEW EVENT MODAL -->

        <div id="myModal3" class="modal fade" role="dialog">
            <div class="event-modal-dialog modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h1 class="modal-title">Create a New Event</h1>
                                </div>
                            </div>
                        </div>

                        <div class="modal-body">
                            <form id="createEvent" class="form">
                                <div class="form-group">
                                    <div class="row modal-space well">
                                        <div class="col-xs-6">
                                            <label for="eventName">Event Name:</label>
                                            <input type="text" name="eventName" maxlength="40" class="form-control" placeholder="What is your event called?" required
                                                v-model="event.name" required>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="logo">Your Logo:</label>
                                            <input type="text" name="logo" class="form-control" maxlength="150" placeholder="Path or URL" required v-model="event.logo">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row modal-space well">
                                        <div class="col-xs-12">
                                            <label for="description">Event Description:</label>
                                            <textarea type="text" name="description" maxlength="300" class="form-control" rows="5" placeholder="What is this event for?    Let your guests know here..."
                                                required v-model="event.description"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row modal-space well">
                                        <div class="col-xs-4">
                                            <label for="startDate">Event Start Date:</label>
                                            <input type="date" name="startDate" class="form-control" placeholder="Event Start Date" :min="date" v-model="event.startDate"
                                                required @change="validateForm">
                                            <p class="error-message text-left text-danger" v-if="!this.validator.startDate">Start date must be today or later.</p>
                                        </div>
                                        <div class="col-xs-4">
                                            <label for="endDate">Event End Date:</label>
                                            <input type="date" name="endDate" class="form-control" placeholder="Event End Date" :min="event.startDate" required v-model="event.endDate"
                                                @change="validateForm">
                                            <p class="error-message text-left text-danger" v-if="!this.validator.endDate">End date must be the same as or later than the start date.</p>
                                        </div>
                                        <div class="col-xs-4">
                                            <label for="timeZone">Time Zone:</label>
                                            <select class="form-control" v-model="event.timeZone">
                                                <option :value="timeZone" v-for="timeZone in timeZones">{{timeZone}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row modal-space well">
                                        <div class="col-xs-offset-3 col-xs-6 col-xs-offset-3 xs-modal-space">
                                            <label for="venue">Venue:</label>
                                            <input type="text" name="venue" class="form-control input-sm" maxlength="40" placeholder="What is the name of your venue?"
                                                required v-model="event.venue">
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-offset-3 col-xs-6 col-xs-offset-3 xs-modal-space">
                                                <label for="address">Address:</label>
                                                <input type="text" name="address" class="form-control" maxlength="75" placeholder="Venue Address" v-model="event.address"
                                                    required>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-offset-3 col-xs-4 xs-modal-space">
                                                <label for="city">City:</label>
                                                <input type="text" name="city" class="form-control" maxlength="75" placeholder="Venue City" v-model="event.city" required>
                                            </div>

                                            <div class="col-xs-3 state xs-modal-space">
                                                <label for="state">State:</label>
                                                <select class="form-control state" v-model="event.state">
                                                    <option :value="state" v-for="(postalCode, state) in locations">{{postalCode}} - {{state}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-offset-3 col-xs-6 col-xs-offset-3">
                                                <label for="zip">Zip Code:</label>
                                                <input type="number" name="zip" maxlength="5" class="form-control" placeholder="Venue Zip" v-model="event.zip" required @change="validateForm">
                                                <!-- <p class="error-message text-left text-danger" v-if="!this.validator.zip">Zip code must be 5 characters long.</p> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-submit btn-square btn-lg fe-btn" data-dismiss="modal" @click="createEvent" type="submit" :disabled="!this.validator.form">Create Event</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-offset-3 col-xs-6">
                            <!-- <div class="modal-footer"> -->
                            <button type="button" class="btn btn-default btn-square" data-dismiss="modal">Close</button>
                            <!-- </div> -->
                        </div>
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
            <div class="row">
                <div class="col-xs-12 no-padding-xs extra-padding-md">
                    <router-link :to="{name: 'findEvents'}">
                        <h1>
                            <button type="button" class="fe-btn">Start Finding Events</button>
                        </h1>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="container-fluid body-text">
            <div class="row top-spacer space-text">
                <div class="col-md-12 col-lg-offset-1 col-lg-4 multi-text-one">
                    <h4 data-toggle="modal" data-target="#myModal2" class="a-pointer under">
                        <b>Create an account to begin</b>
                    </h4>
                    <br>
                    <h4>By signing up you can join events, add activities to your schedule, and take notes</h4>
                </div>
                <div class="col-md-12 col-lg-offset-1 col-lg-4">
                    <img src="../assets/Optimized-computer.jpeg" class="multi-img-one my-img-responsive">
                </div>
            </div>
            <div class="row neg-sec-spacer off-section">
                <div class="col-md-12 col-lg-offset-1 col-lg-4">
                    <img src="../assets/Optimized-click.jpeg" class="multi-img-two my-img-responsive">
                </div>
                <div class="col-md-12 col-lg-offset-2 col-lg-4 multi-text-two">
                    <h4>With an account you can</h4>

                    <h4 v-if="activeUser.hasOwnProperty('name')" data-toggle="modal" data-target="#myModal3" class="a-pointer under">build your event</h4>
                    <h4 v-else>build your event</h4>
                    <br>
                    <h4>Keep your event in 'private' mode while adding your activities, then click 'publish' to post it for your
                        guests to see</h4>
                    <br>
                    <h4> You may edit your event at any time, whether in private or published modes</h4>
                </div>
            </div>
            <div class="row spacer space-text">
                <div class="col-md-12 col-lg-offset-1 col-lg-4 multi-text-three">
                    <h4>Add collaborators to help edit your event, and allow speakers to edit their own activities</h4>
                    <br>
                    <h4>Post seating capacity to limit the size of an event, and enable your guests to reserve their seat by
                        joining the activity</h4>
                </div>
                <div class="col-md-12 col-lg-offset-1 col-lg-4">
                    <img src="../assets/Optimized-meeting.jpeg" class="multi-img-three my-img-responsive">
                </div>
            </div>
            <div class="row neg-spacer off-section">
                <div class="col-md-12 col-lg-offset-1 col-lg-4">
                    <img src="../assets/Optimized-pen-paper.jpg" class="multi-img-four my-img-responsive">
                </div>
                <div class="col-md-12 col-lg-offset-2 col-lg-4 multi-text-four">
                    <h4>Join an event to add its activities to your personal schedule and see your own agenda. Add and remove
                        as your schedule changes</h4>
                    <br>
                    <h4>Take notes on activities you're in, or jot down general notes to remember. Both are stored on your user
                        account
                    </h4>
                    <h4>Stay organized and save vital information without carrying around a pen and paper</h4>
                </div>
            </div>
            <div class="container-fluid bgimg-3 neg-marg">
                <div class="row end-footer">
                    <div class="col-xs-12">
                        <h1>
                            <button data-toggle="modal" data-target="#myModal2" class="fe-btn">Create your
                                <b>Confer</b> Account</button>
                        </h1>
                    </div>
                    <div class="col-xs-12 plain-txt">
                        <h2>and then start to</h2>
                    </div>
                    <div class="col-xs-12">
                        <router-link :to="{name: 'findEvents'}">
                            <h1>
                                <button class="fe-btn">Find Events</button>
                            </h1>
                        </router-link>
                    </div>
                    <div class="col-xs-12 plain-txt">
                        <h2>or</h2>
                    </div>
                    <div class="col-xs-12">
                        <h1>
                            <button v-if="activeUser.hasOwnProperty('name')" data-toggle="modal" data-target="#myModal3" class="fe-btn">Create Your Own</button>
                            <button v-else data-toggle="modal" data-target="#myModal2" class="fe-btn">Create Your Own</button>
                        </h1>
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
            },
            handledError() {
                return this.$store.state.error
            },
            success(){
                return this.$store.state.success
            }
        },
        methods: {
            closeModal(){
                $("#myModal").modal("hide")
                this.$store.dispatch('setSuccess')
            },
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
                this.$store.dispatch('setError')
                this.$store.dispatch('login', this.login)
                this.login = {
                    email: '',
                    password: ''
                }
                // return this.$store.state.error
                
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

    @media screen and (min-width: 650px) {
        #main-logo {
            font-size: 150px;
        }
    }

    @media screen and (max-width: 649px) {
        #main-logo {
            font-size: 75px;
        }
    }

    @media screen and (min-width: 650px) {
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
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 0;
    }

    .bgimg-1 *,
    .bgimg-2 *,
    .bgimg-3 * {
        position: relative;
        z-index: 2 !important;
    }

    .bgimg-1:after,
    .bgimg-2:after,
    .bgimg-3:after {
        position: absolute;
        display: block;
        content: " ";
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(245, 242, 242, .37);
        z-index: 1;
    }

    .bgimg-1 {
        background-image: url('../assets/Optimized-confer-main-photo.jpg');
        min-height: 1000px;
        margin-top: -50px;
    }

    .bgimg-2 {
        background-image: url('../assets/Optimized-conference.jpeg');
        min-height: 400px;
    }

    .bgimg-3 {
        background-image: url('../assets/Optimized-people.jpeg');
        min-height: 600px;
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

    .main-heading {
        font-family: 'Abril Fatface', cursive;
        text-shadow: 2px 2px 10px black;
        color: white;
        margin-top: 250px;
    }

    .end-footer {
        margin-top: 200px;
        padding-bottom: 200px;
    }

    .welcome {
        font-family: 'Lato', sans-serif;
        text-shadow: 2px 2px 4px black;
        color: white;
        letter-spacing: 5px;
    }

    .navbar ul {
        list-style-type: none;
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
            width: 30%;
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
        /* .multi-img-two {
            margin-top: -10px;
            margin-bottom: -10px;
        } */
        /* .multi-img-three {
            margin-top: -16px;
        } */
        /* .multi-img-four {
            margin-top: -10px;
            margin-bottom: -10px;
        } */
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
            margin-top: 50px;
            font-family: 'Lato', sans-serif;
            color: white;
            font-size: 20px;
        }

        .front-login-btn {
            background-color: black;
            color: white;
            border-color: black;
        }

        #force-inline {
            display: inline;
        }

        .shadow {
            font-family: 'Lato', sans-serif;
            color: white;
            text-shadow: 2px 2px 4px black;
        }

        .under {
            text-decoration: underline;
        }

        .neg-marg {
            margin-left: -20px;
            margin-right: -20px;
        }

        .plain-txt {
            font-family: 'Lato', sans-serif;
            letter-spacing: 5px;
        }
    }
</style>