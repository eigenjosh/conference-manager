<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <router-link :to="{path: 'event-schedule/' + event._id}">
                    <button class="lt-btn event-btn word-wrap" @click="setActiveEvent(event)">
                        <div class="col-xs-12">
                            <h1>{{event.name}}</h1>
                        </div>
                        <div class="col-xs-12 img-space">
                            <img :src="event.logo">
                        </div>
                        <div class="col-xs-12">
                            <h3>{{formatDateForDisplay(event.startDate)}} - {{formatDateForDisplay(event.endDate)}}</h3>
                        </div>
                        <!-- <h3>{{event.description}}</h3> -->
                        <!-- <h3>{{event.venue}}</h3> -->
                        <!-- <h5>{{event.address}}</h5> -->
                        <!-- <h5>{{event.city}}, {{event.state}}--{{event.timeZone}}</h5> -->
                        <div class="col-xs-12">
                            <h6>Created
                                <timeago :since="event.created"></timeago>
                            </h6>
                        </div>
                    </button>
                </router-link>
                <hr>
            </div>
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
        methods: {
            formatDateForDisplay(date) {
                if (date) {
                    var parts = date.split('-')
                    let newDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toLocaleString('en-US');
                    return newDate.split(',')[0]
                }
            },
            setActiveEvent(event) {
                this.$store.dispatch('getEventById', event)
            }

        }
    }
</script>

<style>
    .img-space {
        padding-top: 50px;
        padding-bottom: 20px;
    }
</style>