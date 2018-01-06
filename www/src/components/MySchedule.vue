<template>
    <div class="my-schedule container-fluid">
        <nav class="navbar navbar-inverse">
            <div>
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" style="font-family: 'Abril Fatface', cursive;">Confer</a>
                    <div class="text-right">
                        <p class="navbar-text">Welcome {{activeUser.name}}</p>
                        <button type="button" class="btn btn-danger navbar-btn" @click="logout">Logout</button>
                    </div>

                    <!-- Trigger the SIGN UP modal -->
                </div>

                <!-- MENU DROPDOWN -->
                <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">

                    <ul>
                        <li>
                            <router-link :to="{name:'Home'}">
                                <button type="button" class="btn btn-default nav-drop-btn">Home</button>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'findEvents'}">
                                <button type="button" class="btn btn-default nav-drop-btn">Find Events</button>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'adminEvents'}">
                                <button type="button" class="btn btn-default nav-drop-btn">Events I've Created</button>
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

        <h1 style="font-size: 80px" class="main-headline">My Schedule</h1>
        <!-- <button class="btn view-all" @click="getMyActivities">View All Activities</button> -->
        <div v-if="myEvents.length == 0" class="header">
            <h3>Looks like you have not added any activities to your schedule yet! Join an event and click "add to my schedule"
                to see them here!</h3>
        </div>
        <div v-else class="display">
            <div class="row">

                <div class="col-xs-12">
                    <div class="btn-group">
                        <!-- <button type="button" class="btn btn-default">Choose Schedule to View</button> -->
                        <button type="button" class="btn btn-default-picker dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h3>Choose Schedule to View</h3>
                            <span class="caret"></span>
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="a-pointer" @click="getMyActivities">View All Activities</a>
                            </li>
                            <li v-for="e in myEvents">
                                <a class="a-pointer" @click="getMySchedule(e)">{{e.name}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <userSchedule></userSchedule>
            </div>
        </div>
    </div>
</template>

<script>
    import userSchedule from './UserSchedule'
    export default {
        name: "mySchedule",
        data() {
            return {

            }
        },
        computed: {
            activeUser() {
                return this.$store.state.activeUser
            },
            myEvents() {
                return this.$store.state.myEvents
            },
            // activeEvent() {
            //     return this.$store.state.activeEvent
            // }
        },
        mounted() {
            this.$store.dispatch('getMyEvents')
            this.$store.dispatch('getMySchedule', { event: {} })
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            getMySchedule(e) {
                this.$store.dispatch('getMySchedule', e)
            },
            getMyActivities() {
                // this.activeEvent = {}
                this.$store.dispatch('getMyActivities')
            }
        },
        components: {
            userSchedule
        }
    }
</script>

<style>
    .btn-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* .my-schedule {
        background-color: rgba(203, 204, 180, 0.541);
        height: 100vh;
    } */

    .view-all {
        background-color: rgba(127, 127, 113, 0.746);
        width: 20%;
        color: whitesmoke;
        margin-bottom: 5px;
    }

    .btn-event {
        background-color: rgba(127, 127, 113, 0.746);
        color: whitesmoke;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .navbar {
        background: black;
        font: white;
    }

    .nav-drop-btn {
        width: 90%;
        background-color: #FFFFF9;
        margin: 2px;
        font: black;
    }

    .btn-default-picker {
        background-color: lightgray;
        border: black solid 1px;
    }
</style>