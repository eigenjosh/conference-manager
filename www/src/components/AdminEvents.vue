<template>
    <div>
        <nav class="navbar navbar-inverse navbar-fixed-top">
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
                    <router-link :to="{name: 'Home'}">
                        <a class="navbar-brand" style="font-family: 'Abril Fatface', cursive">Confer</a>
                    </router-link>
                    <div class="text-right">
                        <p class="navbar-text">Welcome {{activeUser.name}}</p>
                        <button type="button" class="btn create-color navbar-btn btn-square" data-toggle="modal" data-target="#myModal3" @click="validateForm">Create Event</button>
                        <button type="button" class="btn logout-color navbar-btn logout-btn btn-square" @click="logout">Logout</button>
                    </div>
                    <!-- Trigger the SIGN UP modal -->
                </div>

                <!-- MENU DROPDOWN -->
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
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                    </ul>
                </div>
            </div>
        </nav>

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

        <div class="container">
            <div v-if="events.length == 0">
                <h3>You have not created any events. If you wish to create a new event, please
                    <a class="a-pointer" data-toggle="modal" data-target="#myModal3" @click="validateForm">click here</a>
                </h3>
            </div>
            <div v-else class="admin-header">
                <h1 class="main-headline" style="font-size: 80px">Created Events</h1>
                <div v-for="event in events" class="row ">
                    <aEvent :event="event"></aEvent>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import AEvent from './aEvent'
    export default {
        name: 'adminEvents',
        data() {
            return {
                date: Date,
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
                    timeZone: ''
                },
                validator: {
                    zip: false,
                    startDate: false,
                    endDate: false,
                    form: false
                }
            }
        },
        mounted() {
            this.$store.dispatch('authenticate')
            this.date = new Date().toJSON().split('T')[0];
            this.$store.dispatch('getCreatedEvents')
        },
        computed: {
            events() {
                return this.$store.state.adminEvents
            },
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
        components: {
            AEvent
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
                        endDate: ''
                    }
                }

            }
        }

    }
</script>

<style scoped>
</style>