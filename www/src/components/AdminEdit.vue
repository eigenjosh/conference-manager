<template>
    <div class="event-schedule bg-img-ae">
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
                    <div class="text-right">
                        <button type="button" class="btn logout-color navbar-btn logout-btn btn-square" @click="logout">Logout</button>
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
                        <div v-if="user.hasOwnProperty('name')">
                            <li>
                                <router-link :to="{name: 'adminEvents'}">
                                    <button type="button" class="btn btn-default nav-drop-btn">Edit Events</button>
                                </router-link>
                            </li>
                        </div>
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

        <!-- ADD NEW ACTIVITY MODAL -->
        <div id="myModalAdd" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h1 class="modal-title">Add new Activity</h1>
                                </div>
                            </div>
                        </div>
                        <div class="modal-body">
                            <form class="form">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <label for="name">Name:</label>
                                            <input type="text" name="name" maxlength="70" class="form-control" placeholder="Name" required v-model='activity.name'>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <label for="description">Description:</label>
                                            <textarea type="text" name="description" maxlength="500" class="form-control" rows="5" placeholder="Whats this for?" required
                                                v-model='activity.description'></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <label for="room">Room:</label>
                                            <input type="text" name="room" class="form-control" maxlength="30" placeholder="Room number" required v-model='activity.location'>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="form-group date">
                                            <label for="date">Date:</label>
                                            <input type="date" name="date" class="form-control" placeholder="date" :min="activeEvent.startDate" :max="activeEvent.endDate"
                                                required v-model='activity.date' @change="validateActivityForm">
                                            <p class="error-message text-left text-danger" v-if="!this.validator.date">Date must be during the event.</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- START TIME -->
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="form-group time">
                                            <label for="sel1">Start Time</label>
                                            <select class="form-control" required v-model="activity.startTime" @change="timeClickHandler">
                                                <option :value="startSlot" v-for="startSlot in timeSlots">{{startSlot}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!-- END TIME -->
                                    <div class="col-xs-12">
                                        <div class="form-group time">
                                            <label for="sel2">End Time</label>
                                            <select class="form-control" v-model="activity.endTime" @change="validateActivityForm">
                                                <option :value="endSlot" v-for="endSlot in timeSlots">{{endSlot}}</option>
                                            </select>
                                            <p class="error-message text-left text-danger" v-if="!this.validator.endTime">End time must be later than start time.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <label for="capacity">Number of Seats (optional):</label>
                                            <input type="number" name="capacity" class="form-control" placeholder="Number of Seats Available" v-model='activity.capacity'>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <label for="speakerName">Speaker Name:</label>
                                            <input type="text" name="speakerName" class="form-control" maxlength="30" placeholder="Speaker Name" v-model='activity.speakerName'>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-submit btn-success" @click="addActivity" data-dismiss="modal" type="submit" :disabled="!this.validator.activityForm">Submit</button>
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
        <!-- EDIT ACTIVITY MODAL -->

        <div id="myModalDetails" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Activity</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form">
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <textarea type="text" maxlength="70" name="name" class="form-control" placeholder="Name" rows="1" required v-model='activity.name'>{{activity.name}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textarea type="text" name="description" maxlength="500" class="form-control" rows="5" placeholder="Whats this for?" required
                                    v-model='activity.description'>{{activity.description}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="room">Room:</label>
                                <textarea type="text" name="room" maxlength="30" class="form-control" placeholder="Room number" required rows="1" v-model='activity.location'>{{activeActivity.location}}</textarea>
                            </div>
                            <div class="form-group date">
                                <label for="date">Date:</label>
                                <input type="date" name="date" class="form-control" placeholder="date" :min="date" :max="activeEvent.endDate" required v-model='activity.date'
                                    @change="validateActivityForm">
                                <p class="error-message text-left text-danger" v-if="!this.validator.date">Date must be during the event.</p>
                            </div>
                            <!-- START TIME -->
                            <div class="form-group time">
                                <label for="sel1">Start Time</label>
                                <select class="form-control" required v-model="activity.startTime" @change="timeClickHandler">
                                    <option :value="startSlot" v-for="startSlot in timeSlots">{{startSlot}}</option>
                                </select>
                            </div>
                            <!-- END TIME -->
                            <div class="form-group time">
                                <label for="sel2">End Time</label>
                                <select class="form-control" v-model="activity.endTime" @change="validateActivityForm">
                                    <option :value="endSlot" v-for="endSlot in timeSlots">{{endSlot}}</option>
                                </select>
                                <p class="error-message text-left text-danger" v-if="!this.validator.endTime">End time must be later than start time.</p>
                            </div>
                            <div class="form-group">
                                <label for="capacity">Number of Seats (optional):</label>
                                <input type="number" name="capacity" class="form-control" :min="0" :max="1000" :placeholder="activeActivity.capacity" v-model='activity.capacity'>
                            </div>
                            <div class="form-group">
                                <label for="speakerName">Speaker Name:</label>
                                <textarea type="text" maxlength="30" name="speakerName" class="form-control" placeholder="Speaker Name" v-model='activity.speakerName'>{{activeActivity.speakerName}}</textarea>
                            </div>
                            <div class="form-group">
                                <button class="btn fe-btn btn-square" @click="editActivity" data-dismiss="modal" type="submit" :disabled="!this.validator.activityForm">Save Changes</button>
                                <button class="btn logout-color btn-square" data-dismiss="modal" @click="deleteActivity" :disabled="!this.validator.activityForm">Delete Activity</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>
        <!-- EDIT EVENT MODAL -->

        <div id="myModal3" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h1 class="modal-title">Edit Event</h1>

                    </div>
                    <div class="modal-body">
                        <form id="createEvent" class="form">
                            <div class="form-group">
                                <label for="eventName">Event Name</label>
                                <textarea type="text" name="eventName" maxlength="40" class="form-control" placeholder="Whats the event called?" rows="1"
                                    required v-model="event.name" required>{{activeEvent.name}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="logo">Logo</label>
                                <textarea type="text" name="logo" maxlength="300" class="form-control" rows="5" placeholder="Image path or URL" required
                                    v-model="event.logo">{{activeEvent.logo}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea type="text" name="description" maxlength="300" class="form-control" rows="5" placeholder="What is this event for?"
                                    required v-model="event.description">{{activeEvent.description}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="startDate">Start Date:</label>
                                <input type="date" name="startDate" class="form-control" placeholder="Start Date" :min="date" required v-model="event.startDate"
                                    required @change="validateEventForm">
                                <p class="error-message text-left text-danger" v-if="!this.validator.startDate">Start date must be today or later.</p>
                            </div>
                            <div class="form-group">
                                <label for="endDate">End Date:</label>
                                <input type="date" name="endDate" class="form-control" placeholder="End Date" :min="event.startDate" required v-model="event.endDate"
                                    @change="validateEventForm">
                                <p class="error-message text-left text-danger" v-if="!this.validator.endDate">End date must be the same as or later than the start date.</p>
                            </div>
                            <div class="form-group">
                                <label for="venue">Venue:</label>
                                <textarea type="text" name="venue" maxlength="40" class="form-control" placeholder="Venue" rows="1" required v-model="event.venue">{{event.venue}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="address">Address:</label>
                                <textarea type="text" name="address" maxlength="75" class="form-control" placeholder="Venue Address" rows="1" v-model="event.address"
                                    required>{{activeEvent.address}}</textarea>
                                <textarea type="text" name="city" maxlength="70" class="form-control" placeholder="Venue City" rows="1" v-model="event.city"
                                    required>{{activeEvent.city}}</textarea>
                                <div class="form-group state">
                                    <label for="state">Venue State</label>
                                    <select class="form-control state" v-model="event.state">
                                        <option :value="state" v-for="(postalCode, state) in locations">{{postalCode}} - {{state}}</option>
                                    </select>
                                </div>
                                <textarea type="number" maxlength="5" name="zip" class="form-control" placeholder="Venue Zip" rows="1" v-model="event.zip"
                                    required @change="validateEventForm">{{activeEvent.zip}}</textarea>
                                <p class="error-message text-left text-danger" v-if="!this.validator.zip">Zip code must be 5 characters long.</p>
                                <div class="form-group">
                                    <label for="timeZone">Time Zone</label>
                                    <select class="form-control" v-model="event.timeZone">
                                        <option :value="timeZone" v-for="timeZone in timeZones">{{timeZone}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-square btn-lg fe-btn" data-dismiss="modal" @click="editEvent" type="submit" :disabled="!this.validator.eventForm">Edit Event</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>
        <!-- ADD COLLABORATOR MODAL -->

        <div id="addCollab" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Collaborators To Help Build Event</h4>
                    </div>
                    <div class="modal-body">
                        <form id="collabs" class="form">
                            <div v-for="collab in collaborators">
                                <h4>{{collab.name}}
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true" @click="removeCollab(collab._id)"></span>
                                </h4>
                            </div>
                            <div class="form-group">
                                <label for="email">Collaborator's Email Address:</label>
                                <input type="email" maxlength="57" name="email" class="form-control" placeholder="Email" required v-model='collab.email'>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-square btn-lg fe-btn" @click="addCollab" type="submit">Submit</button>
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
                <div class="col-xs-12 main-headline" data-toggle="modal" data-target="#myModal3" @click="eventFormClickHandler">
                    <h1 class="bottom-sp">{{activeEvent.name}}</h1>
                    <a class="a-pointer fe-btn bottom-sp" aria-hidden="true"> Click to Edit Event Details</a>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-3">
                    <button class="btn fe-btn btn-square" data-toggle="modal" data-target="#myModalAdd" @click="validateActivityForm">Add Activity</button>
                </div>
                <div class="col-xs-12 col-md-3">
                    <button v-if="!activeEvent.published" class="btn fe-btn btn-square" @click="publish" data-toggle="tooltip" data-placement="top"
                        title="Publish event so others can see it!">Publish</button>
                    <button v-else="activeEvent.published" class="btn fe-btn btn-square" @click="unPublish" data-toggle="tooltip" data-placement="top"
                        title="Only you can see Private events!">Make Private</button>
                </div>
                <div class="col-xs-12 col-md-3">
                    <router-link :to="{path: '/event-schedule/' + activeEvent._id}">
                        <button class="btn fe-btn btn-square" @click="setActiveEvent(event)">Go To Event Page</button>
                    </router-link>
                </div>
                <div class="col-xs-12 col-md-3" v-if="user._id == activeEvent.creatorId">
                    <button class="btn fe-btn btn-square" data-toggle="modal" data-target="#addCollab">Edit Collaborators</button>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <button class="btn logout-color btn-square bottom-sp" @click="deleteEvent">Delete Event</button>
                    </div>
                </div>
            </div>
            <div class="row" v-for="(timeDict, date) in schedule">
                <div class="col-xs-12 date-col text-left">
                    <h3>{{formatDateForDisplay(date)}}</h3>
                </div>
                <div class="row" v-for="(activitiesList, time) in timeDict">
                    <div class="col-xs-6 col-xs-offset-1 col-md-1 time-col">
                        <h3>{{time}}</h3>
                    </div>
                    <div class="col-xs-12 col-md-9">
                        <div class="row">
                            <div class="col-xs-12 col-md-4" v-for="activity in activitiesList">
                                <button data-toggle="modal" data-target="#myModalDetails" @click="activityFormClickHandler(activity)" class="btn btn-primary activities">
                                    <h5>{{formatDateForDisplay(activity.date)}} {{activity.startTime}} - {{activity.endTime}}</h5>
                                    <h4>{{activity.name}}</h4>
                                    <a class="a-pointer" aria-hidden="true" @click="validateActivityForm"> Click to Edit Activity</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '../router'
    export default {
        name: 'adminEdit',
        data() {
            return {
                date: Date,
                activity: {
                    name: '',
                    description: '',
                    location: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    capacity: '',
                    speakerName: ''
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
                    timeZone: ''
                },
                validator: {
                    date: false,
                    endTime: false,
                    activityForm: false,
                    zip: false,
                    startDate: false,
                    endDate: false,
                    eventForm: false
                },
                collab: {
                    email: "",
                }
            }
        },
        mounted() {
            this.$store.dispatch('getAdminEventById', { _id: this.$route.params.id })
            this.$store.dispatch('getCollabs', { _id: this.$route.params.id })
            this.date = new Date().toJSON().split('T')[0];
        },
        computed: {
            activeActivity() {
                return this.$store.state.activeActivity
            },
            user() {
                return this.$store.state.activeUser
            },
            schedule() {
                return this.$store.state.schedule
            },
            collaborators() {
                return this.$store.state.collaborators
            },
            activeEvent() {
                return this.$store.state.activeEvent
            },
            timeSlots() {
                return this.$store.state.timeSlots
            },
            locations() {
                return this.$store.state.locations
            },
            timeZones() {
                return this.$store.state.timeZones
            }
        },
        methods: {
            eventFormClickHandler() {
                this.setActiveEvent(this.activeEvent);
                this.validateEventForm();
            },
            activityFormClickHandler(activity) {
                this.setActiveActivity(activity);
                this.validateActivityForm();
            },
            timeClickHandler() {
                console.log('in time click handler')
                this.setTime();
                this.validateActivityForm();
            },
            validateDate() {
                this.validator.date = (new Date(this.activity.date).getTime() >= new Date(this.activeEvent.startDate).getTime() && new Date(this.activity.date).getTime() <= new Date(this.activeEvent.endDate).getTime())
                console.log('activity.date: ', this.activity.date)
                console.log('event: ', this.event)
                console.log('event.startDate: ', this.event.startDate)
                console.log('activeEvent.startDate: ', this.activeEvent.startDate)
            },
            validateEndTime() {
                this.validator.endTime = (this.timeSlots.indexOf(this.activity.endTime) > this.timeSlots.indexOf(this.activity.startTime))
                console.log(this.activity.endTime)
                console.log(this.activity.startTime)
            },
            validateActivityForm() {
                this.validateDate()
                this.validateEndTime()
                this.validator.activityForm = (this.validator.date && this.validator.endTime)
                console.log('validator: ', this.validator)
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
            validateEventForm() {
                this.validateZip()
                this.validateStartDate()
                this.validateEndDate()
                this.validator.eventForm = (this.validator.zip && this.validator.startDate && this.validator.endDate)
                console.log('validator: ', this.validator)
                console.log('event: ', this.event)
            },
            formatDateForDisplay(date) {
                if (date) {
                    var parts = date.split('-')
                    let newDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toLocaleString('en-US');
                    return newDate.split(',')[0]
                }
            },
            addCollab() {
                console.log("trying to add:", this.collab.email)
                this.$store.dispatch('addCollab', { event: this.activeEvent, email: this.collab.email })
                this.collab.email = ""
            },
            getCollabs() {
                this.$store.dispatch('getCollabs', activeEvent)
            },
            removeCollab(id) {
                this.$store.dispatch('removeCollab', { event: this.activeEvent, _id: id })
            },
            addActivity() {
                this.validateActivityForm()
                if (this.validator.activityForm) {
                    this.$store.dispatch('addActivity', { activity: this.activity, eventId: this.activeEvent._id, emit: true })
                    this.activity = {
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
            setActiveActivity(activity) {
                console.log('setActiveActivity fired.')
                this.$store.dispatch('getActivityById', activity)
                this.activity = activity
            },
            logout() {
                this.$store.dispatch('logout')
            },
            setTime() {
                if (this.activity.startTime == null) {
                    this.activity.startTime = this.$store.state.timeSlots[0]
                }
            },
            editActivity() {
                this.validateActivityForm()
                if (this.validator.activityForm) {
                    this.$store.dispatch('editActivity', { activity: this.activity, emit: true })
                }
            },
            deleteActivity() {
                this.$store.dispatch('deleteActivity', { activity: this.activity, emit: true })
            },
            deleteEvent() {
                debugger
                this.$store.dispatch('deleteEvent', { event: this.activeEvent, emit: true })

            },
            publish() {
                this.activeEvent.published = true
                this.$store.dispatch('publishEvent', { event: this.activeEvent, emit: true })
            },
            unPublish() {
                this.activeEvent.published = false
                this.$store.dispatch('publishEvent', { event: this.activeEvent, emit: true })
            },
            setActiveEvent(activeEvent) {
                this.$store.dispatch('getEventById', activeEvent)
                this.event = activeEvent
            },
            editEvent() {
                this.validateEventForm()
                if (this.validator.eventForm) {
                    this.$store.dispatch('editEvent', { event: this.event, emit: true })
                }
            }
        }
    }
</script>

<style>
    .bottom-sp {
        margin-bottom: 50px;
        margin-top: 50px;
    }
    .bg-img-ae {
        background-image: url('../assets/light-bg.jpeg');
        position: relative;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        
    }
</style>