<template>
    <div class="my-schedule container-fluid bg-img-9">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div>
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
                        <button type="button" class="btn logout-color navbar-btn logout-btn btn-square" @click="logout">Logout</button>
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
                                <button type="button" class="btn btn-default nav-drop-btn">Edit Events</button>
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
        <div v-if="myEvents.length == 0" class="header">
            <h3>Looks like you have not added any activities to your schedule yet! Join an event and click "add to my schedule"
                to see them here!</h3>
        </div>
        <div v-else class="display">
            <div class="row">
                <div class="col-xs-12">
                    <div class="btn-group">
                        <button type="button" class="btn fe-btn btn-square dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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

<style scoped>
    .fe-btn:hover {
        color: white;
    }
    a {
        color: white;
    }
    .bg-img-9 {
        background-image: url('../assets/light-bg.jpeg');
        position: relative;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 1000px;
    }
</style>