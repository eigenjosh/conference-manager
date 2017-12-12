<template>
    <div>
        <div class="row">
        <div class="col-xs-12">
            <h2>{{activeEvent.name}}</h2>
        </div>
    </div>
        <div class="row" v-for="(timeDict, date) in userSchedule">
            <div class="col-xs-12 ">
                <h3>{{date}}</h3>
            </div>
            <div class="row" v-for="(activitiesList, time) in userSchedule[date]">
                <div class="col-xs-1 col-xs-offset-1">
                    <h3>{{time[0]}}{{time[1]}}:{{time[2]}}{{time[3]}}</h3>
                </div>
                <div class="col-xs-12 col-md-3" v-for="activity in activitiesList">
                    <button class="btn btn-primary activities">
                        <h5>{{activity.date}} {{activity.startTime}} - {{activity.endTime}}</h5>
                        <h4>{{activity.name}}</h4>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'userSchedule',
        data() {
            return {

            }
        },
        computed: {
            userSchedule() {
                return this.$store.state.userSchedule
            },
            activeEvent(){
                return this.$store.state.activeEvent
            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style>
</style>