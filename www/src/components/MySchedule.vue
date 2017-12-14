<template>
    <div class="container-fluid">
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

                    <!-- Trigger the SIGN UP modal -->
                </div>

                <!-- MENU DROPDOWN -->
                <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">

                    <ul>
                        <li>
                            <router-link :to="{name:'Home'}">
                                <button type="button" class="btn btn-default">Home</button>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'findEvents'}">
                                <button type="button" class="btn btn-default">Find Events</button>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'adminEvents'}">
                                <button type="button" class="btn btn-default">Events I've Created</button>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'userNotes'}">
                                <button type="button" class="btn btn-default">My Notes</button>
                            </router-link>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                    </ul>
                </div>
            </div>
        </nav>
        <h1>My Schedule</h1>
        <div v-if="myEvents.length == 0" class="header">
            <h3>Looks like you have not added any activities to your schedule yet! Join an event and click "add to my schedule" to see them here!</h3>
        </div>
        <div v-else class="display">
            <div class="row">
                <div class="col-xs-4" v-for="e in myEvents">
                    <button class="btn btn-default btn-text" @click="getMySchedule(e)">{{e.name}}</button>
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
            }
        },
        mounted() {
            this.$store.dispatch('getMyEvents')
            this.$store.dispatch('getMySchedule', {event: {}})
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            getMySchedule(e) {
                this.$store.dispatch('getMySchedule', e)
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
</style>