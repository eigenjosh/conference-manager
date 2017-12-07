<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <h1>{{event.name}}</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-2 col-xs-offset-9">
                    <router-link :to="{name: eventSchedule}">
                        <button class="btn btn-success">
                            View Schedule
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="row" v-for="activity in activities">
                <button type="button" data-toggle="modal">
                    <p>{{activity.startTime}}</p>
                    <h3>{{activitiy.name}}</h3>
                </button>
            </div>
            <div class="row">
                <div class="col-xs-2">
                    <button type="button" data-toggle="modal">
                        <i class="fa fa-plus-square-o fa-2x" aria-hidden="true"></i>Add New Activity
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'adminEvent',
        data() {
            return {

            }
        },
        // mounted(){
        //     this.$store.dispatch('getActivitesByEventId', this.event)
        // },
        // computed: {
        //     activities(){
        //         return this.$store.state.activities[this.activeEvent._id]
        //     },
        //     activeEvent(){
        //         return this.$store.state.activeEvent
        //     }
        // }
    }
</script>

<style scoped>