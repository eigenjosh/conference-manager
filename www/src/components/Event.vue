<template>
    <div>
        <div class="col-xs-offset-2 col-xs-8 col-sm-offset-1 col-sm-10">
            <router-link :to="{path: 'event-schedule/' + event._id}">
                <button class="btn btn-default event-btn" @click="setActiveEvent(event)">
                    <h2>{{event.name}}</h2>
                    <h3>{{event.startDate}} - {{event.endDate}}</h3>
                    <h3>{{event.description}}</h3>
                    <h3>{{event.venue}}</h3>
                    <h5>{{event.address}}</h5>
                    <h5>{{event.city}}, {{event.state}}</h5>
                    <h6>Created
                            <timeago :since="event.created"></timeago>
                        </h6>
                </button>
            </router-link>
            <!--<router-link :to="'events/'+event.id">
                
            </router-link>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "event",
        props: ["event"],
        data() {
            return {

            }
        },
        computed: {
            events() {
                return this.$store.state.events
            }
        },
        mounted() {

        },
        methods:{
            setActiveEvent(event){
                this.$store.dispatch('getEventById', event)
            },
        }
    }
</script>

<style>
</style>