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
        
                                    <router-link :to="{name: 'findEvents'}">
                                        <button type="button" class="btn btn-default">Find Events</button>
                                    </router-link>
                                </li>
                                <!-- <li>
            
                                        <router-link :to="{name: 'eventSchedule'}">
                                            <button type="button" class="btn btn-default">Event Schedule</button>
                                        </router-link>
                                    </li> -->
        
                                <div v-if="activeUser.hasOwnProperty('name')">
                                    <li>
        
                                        <router-link :to="{name:'Home'}">
                                            <button type="button" class="btn btn-default">Home</button>
                                        </router-link>
                                    </li>
                                    <li>
        
                                        <router-link :to="{name:'userNotes'}">
                                            <button type="button" class="btn btn-default">My Notes</button>
                                        </router-link>
                                    </li>
        
                                </div>
        
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
                <div class="row">
                    <div class="col-xs-2" v-for="e in myEvents">
                        <button class="btn btn-default" @click="getMySchedule(e)">{{e.name}}</button>
                    </div>
                </div>

    </div>
</template>

<script>
    export default {
        name: "mySchedule",
        data(){
            return {

            }
        },
        computed:{
            activeUser(){
                return this.$store.state.activeUser
            },
            myEvents(){
                return this.$store.state.myEvents
            }
        },
        mounted(){
            
            this.$store.dispatch('getMyEvents')
        },
        methods:{
            logout(){
                this.$store.dispatch('logout')
            },
            getMySchedule(e){
                debugger
                this.$store.dispatch('getMySchedule', e)
            }
        }
    }
</script>

<style>

</style>