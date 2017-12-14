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
                    <div class="text-right">
                        <button type="button" class="btn btn-danger navbar-btn" @click="logout">Logout</button>
                    </div>
                    <!-- <div class="text-right" v-else>
                            <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal">Login</button>
                            <button type="button" class="btn btn-success navbar-btn" data-toggle="modal" data-target="#myModal2">Sign-up</button>
                        </div> -->
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
        <!-- add new activity modal -->
        <div id="myModalAdd" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add new Activity</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form">
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" name="name" class="form-control" placeholder="Name" required v-model='activity.name'>
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textarea type="text" name="description" class="form-control" rows="5" placeholder="Whats this for?" required v-model='activity.description'></textarea>
                            </div>
                            <div class="form-group">
                                <label for="room">Room:</label>
                                <input type="text" name="room" class="form-control" placeholder="Room number" required v-model='activity.location'>
                            </div>
                            <div class="form-group date">
                                <label for="date">Date:</label>
                                <input type="date" name="date" class="form-control" placeholder="date" :min="activeEvent.startDate" :max="activeEvent.endDate"
                                    required v-model='activity.date'>
                            </div>
                            <!-- START TIME -->
                            <div class="form-group time">
                                <label for="sel1">Start Time</label>
                                <select class="form-control" required @change="setTime" v-model="activity.startTime">
                                    <option :value="startSlot" v-for="startSlot in timeSlots">{{startSlot}}</option>
                                </select>
                            </div>
                            <!-- END TIME -->
                            <div class="form-group time">
                                <label for="sel1">End Time</label>
                                <select class="form-control" v-model="activity.endTime">
                                    <option :value="endSlot" v-for="endSlot in timeSlots">{{endSlot}}</option>

                                </select>
                            </div>
                            <div class="form-group">
                                <label for="capacity">Number of Seats:</label>
                                <input type="number" name="capacity" class="form-control" placeholder="Number of Seats Available" v-model='activity.capacity'>
                            </div>
                            <div class="form-group">
                                <label for="speakerName">Speaker Name:</label>
                                <input type="text" name="speakerName" class="form-control" placeholder="Speaker Name" v-model='activity.speakerName'>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-success" @click="addActivity" data-dismiss="modal" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>
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
                                <textarea type="text" name="name" class="form-control" placeholder="Name" rows="1" required v-model='activity.name'>{{activity.name}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textarea type="text" name="description" class="form-control" rows="5" placeholder="Whats this for?" required v-model='activity.description'>{{activity.description}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="room">Room:</label>
                                <textarea type="text" name="room" class="form-control" placeholder="Room number" required rows="1" v-model='activity.location'>{{activeActivity.location}}</textarea>
                            </div>
                            <div class="form-group date">
                                <label for="date">Date:</label>
                                <input type="date" name="date" class="form-control" placeholder="date" :min="date" required v-model='activity.date'>
                            </div>
                            <!-- START TIME -->
                            <div class="form-group time">
                                <label for="sel1">Start Time</label>
                                <select class="form-control" required v-model="activity.startTime">
                                    <option :value="startSlot" v-for="startSlot in timeSlots">{{startSlot}}</option>
                                </select>
                            </div>
                            <!-- END TIME -->
                            <div class="form-group time">
                                <label for="sel1">End Time</label>
                                <select class="form-control" v-model="activity.endTime">
                                    <option :value="endSlot" v-for="endSlot in timeSlots">{{endSlot}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="capacity">Number of Seats:</label>
                                <input type="number" name="capacity" class="form-control" :placeholder="activeActivity.capacity" v-model='activity.capacity'>
                            </div>
                            <div class="form-group">
                                <label for="speakerName">Speaker Name:</label>
                                <textarea type="text" name="speakerName" class="form-control" placeholder="Speaker Name" v-model='activity.speakerName'>{{activeActivity.speakerName}}</textarea>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-success" @click="editActivity" data-dismiss="modal" type="submit">Save Changes</button>
                                <button class="btn btn-danger" data-dismiss="modal" @click="deleteActivity">Delete</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>


        <!-- EDIT EVENT STUFF -->
        <div id="myModal3" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Event</h4>

                    </div>
                    <div class="modal-body">
                        <form id="createEvent" class="form">
                            <div class="form-group">
                                <label for="eventName">Event Name</label>
                                <textarea type="text" name="eventName" class="form-control" placeholder="Whats the event called?" rows="1" required v-model="event.name"
                                    required>{{activeEvent.name}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea type="text" name="description" class="form-control" rows="5" placeholder="What is this event for?" required v-model="event.description">{{activeEvent.description}}</textarea>
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
                                <textarea type="text" name="venue" class="form-control" placeholder="Venue" rows="1" required v-model="event.venue">{{event.venue}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="address">Address:</label>
                                <textarea type="text" name="address" class="form-control" placeholder="Venue Address" rows="1" v-model="event.address" required>{{activeEvent.address}}</textarea>
                                <textarea type="text" name="city" class="form-control" placeholder="Venue City" rows="1" v-model="event.city" required>{{activeEvent.city}}</textarea>
                                <div class="form-group state">
                                    <label for="state">Venue State</label>
                                    <select class="form-control state" v-model="event.state">
                                        <option :value="state" v-for="(postalCode, state) in locations">{{postalCode}} - {{state}}</option>
                                    </select>
                                </div>
                                <textarea type="number" name="zip" class="form-control" placeholder="Venue Zip" rows="1" v-model="event.zip" required>{{activeEvent.zip}}</textarea>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-success" data-dismiss="modal" @click="editEvent" type="submit">Edit Event</button>
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
                <div class="col-xs-6 well" data-toggle="modal" data-target="#myModal3" @click="setActiveEvent(activeEvent)">
                    <h1>{{activeEvent.name}}</h1>
                    <i class="fa fa-pencil fa-2x " aria-hidden="true"></i>
                </div>

                <div class="col-xs-6 text-right">
                    <button class="btn btn-danger btn" @click="deleteEvent">Delete Event</button>
                    <button class="btn btn-warning btn" data-toggle="modal" data-target="#myModalAdd">Add Activity</button>
                    <button v-if="!activeEvent.published" class="btn btn-success" @click="publish">Publish</button>
                    <button v-else="activeEvent.published" class="btn btn-success" @click="unPublish">Make Private</button>
                </div>
            </div>
            <div class="row" v-for="(timeDict, date) in schedule">
                <div class="col-xs-12 ">
                    <h3>{{date}}</h3>
                </div>
                <div class="row" v-for="(activitiesList, time) in timeDict">
                    <div class="col-xs-1 col-xs-offset-1">
                        <h3>{{time}}</h3>
                    </div>
                    <div class="col-xs-12 col-md-3" v-for="activity in activitiesList">
                        <button data-toggle="modal" data-target="#myModalDetails" @click="setActiveActivity(activity)" class="btn btn-primary activities">
                            <h5>{{activity.date}} {{activity.startTime}} - {{activity.endTime}}</h5>
                            <h4>{{activity.name}}</h4>
                            <i class="fa fa-pencil pull-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'adminEdit',
        data() {
            return {
                date: Date.toLocaleString('en-US'),
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
                    endDate: ''
                }

            }
        },
        mounted() {
            this.$store.dispatch('getEventById', { _id: this.$route.params.id })
            this.date = new Date().toLocaleString('en-US');
            this.date = this.date.split(',')[0]
            console.log(this.date)
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
            activeEvent() {
                return this.$store.state.activeEvent

            },
            timeSlots() {
                return this.$store.state.timeSlots
            },
            locations() {
                return this.$store.state.locations
            }
        },
        methods: {
            addActivity() {
                debugger
                var parts = this.activity.date.split('-')
                let date = new Date(parseInt(parts[0]),parseInt(parts[1])-1,parseInt(parts[2])).toLocaleString('en-US');
                date = date.split(',')[0]
                this.activity.date = date
                this.$store.dispatch('addActivity', { activity: this.activity, eventId: this.activeEvent._id })
                this.activity = {}
            },
            setActiveActivity(activity) {
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
                var parts = this.activity.date.split('-')
                let date = new Date(parseInt(parts[0]),parseInt(parts[1])-1,parseInt(parts[2])).toLocaleString('en-US');
                date = date.split(',')[0]
                this.activity.date = date
                this.$store.dispatch('editActivity', this.activity)
            },
            deleteActivity() {
                this.$store.dispatch('deleteActivity', this.activity)
            },
            deleteEvent() {
                debugger
                this.$store.dispatch('deleteEvent', this.activeEvent)

            },
            publish() {
                this.activeEvent.published = true
                this.$store.dispatch('publishEvent', this.activeEvent)
            },
            unPublish() {
                this.activeEvent.published = false
                this.$store.dispatch('publishEvent', this.activeEvent)
            },
            setActiveEvent(activeEvent) {
                this.$store.dispatch('getEventById', activeEvent)
                this.event = activeEvent
            },
            editEvent() {
                var parts = this.event.date.split('-')
                let date = new Date(parseInt(parts[0]),parseInt(parts[1])-1,parseInt(parts[2])).toLocaleString('en-US');
                date = date.split(',')[0]
                this.event.date = date
                this.$store.dispatch('editEvent', this.event)
            }
        }
    }
</script>

<style>
    .activities {
        width: 100%;
    }

    .time {
        width: 100px;
    }

    .date {
        width: 250px;
    }
</style>