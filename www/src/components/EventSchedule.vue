<template>
    <div class="event-schedule">
            <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="navbar-header ">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                                aria-expanded="false">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand">Confer</a>
                            <div class="text-right">
                                <button type="button" class="btn btn-danger navbar-btn" data-toggle="modal" data-target="#myModal">Logout</button>
                            </div>
                        </div>
        
                        <!-- MENU DROWDOWN -->
                        <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">     
                            <ul>
                                <li>     
                                    <router-link :to="{name: 'findEvents'}">
                                        <button type="button" class="btn btn-default">Find Events</button>
                                    </router-link>
                                </li>
                                <li>     
                                    <router-link :to="{name: 'eventSchedule'}">
                                        <button type="button" class="btn btn-default">Event Schedule</button>
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
                        </div>
                        <!-- /.navbar-collapse -->
                    </div>
                    <!-- /.container-fluid -->
                </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-6">
                    <h2>{{activeEvent.name}}</h2>
                </div>
                <div class="col-xs-6 text-right">
                    <button class="btn btn-primary btn-lg">Join Event</button>
                </div>
            </div>
            <div class="row" v-for="( activitiesList,time) in schedule">
                <div class="col-xs-1 col-xs-offset-1">
                    <h3>{{time}}</h3>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3" v-for="activity in activitiesList">
                    <h4>{{activity.name}}</h4>
                    <h5>{{activity.startTime}}</h5>
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

            }
        },
        // mounted(){
        //     this.$store.dispatch('getActivitesByEventId', this.event)
        // },
        computed: {
            schedule(){
                return this.$store.state.schedule
            },
            // activeEvent(){
            //     return this.$store.state.activeEvent
            // }
        }
    }
</script>

<style>

</style>