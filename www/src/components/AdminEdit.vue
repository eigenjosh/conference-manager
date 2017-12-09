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
                                <textarea type="text" name="description" class="form-control" rows="5"placeholder="Whats this for?" required v-model='activity.description'></textarea>
                            </div>
                            <div class="form-group">
                                <label for="room">Room:</label>
                                <input type="text" name="room" class="form-control" placeholder="Room number" required v-model='activity.location'>
                            </div>
                            <div class="form-group">
                                <label for="date">Date:</label>
                                <input type="date" name="date" class="form-control" placeholder="date" :min="date"required v-model='activity.date'>
                            </div>
                            <div class="form-group">
                                <label for="startTime">Start Time:</label>
                                <input type="text" name="startTime" class="form-control" placeholder="Start Time" required v-model='activity.startTime'>
                            </div>
                            <div class="form-group">
                                <label for="endTime">End Time:</label>
                                <input type="text" name="endTime" class="form-control" placeholder="End Time" required v-model='activity.endTime'>
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

        <!-- SIGN UP MODAL -->
        <div id="myModalDetails" class="modal fade" role="dialog">
                <div class="modal-dialog">
    
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">{{activeActivity.name}}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xs-6">
                                    <h3>{{activeActivity.date}}  {{activeActivity.startTime}}-{{activeActivity.endTime}}</h3>
                                    <h2>{{activeActivity.name}}</h2>
                                </div>
                                <div class="col-xs-6">
                                    <h3>{{activeActivity.speakerName}}</h3>
                                    <h2>{{activeActivity.location}}-seats available:{{activeActivity.capacity}}</h2>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <p>{{activeActivity.description}}</p>
                                </div>
                            </div>
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
                    <h2>{{event.name}}</h2>
                </div>

                <div class="col-xs-6 text-right">
                    <button class="btn btn-warning btn" data-toggle="modal" data-target="#myModalAdd">Add Activity</button>
                    <button class="btn btn-success btn">Post Schedule</button>
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
                        <button data-toggle="modal" data-target="#myModalDetails" @click="setActiveActivity(activity)"class="btn btn-primary activities">
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
                date: Date,
               activity:{
                   name: '',
                   description: '',
                   location: '',
                   date: '',
                   startTime: '',
                   endTime: '',
                   capacity: '',
                   speakerName: '',
                //    creatorId: this.activeUser._id,
                //    eventId: this.activeEvent._id
               }

            }
        },
        mounted(){
            // this.$store.dispatch('getActivitesByEventId', this.event)
            this.date = new Date().toJSON().split('T')[0];
        },
        computed: {
            activeActivity(){
                return this.$store.state.activeActivity
            },
            user() {
                return this.$store.state.activeUser
            },
            schedule() {
                return this.$store.state.schedule
            },
            event(){
                return this.$store.state.activeEvent
            }
        },
        methods: {
            addActivity(){
                debugger
                this.$store.dispatch('addActivity', {activity: this.activity, creatorId: this.event.creatorId, eventId: this.event._id})
            },
            setActiveActivity(activity){
                
                this.$store.dispatch('getActivityById', activity)
            },
            logout() {
                this.$store.dispatch('logout')
            }
        }
    }
</script>

<style>
    .activities {
        width: 100%;
    }
</style>