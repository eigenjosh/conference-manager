<template>
    <div>
        <h1>Schedule</h1>


        <div class="row" v-for="( activitiesList,time) in schedule">
            <h3>{{time}}</h3>
            <div class="col-xs-12 col-sm-6 col-md-3" v-for="activity in activitiesList">
                <h4>{{activity.name}}</h4>
                <h5>{{activity.startTime}}</h5>
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