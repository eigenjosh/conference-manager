<template>
    <div class="container">
        <h1>Find Events</h1>
        <form id="find-events" class="form" @submit.prevent="findEvents">
            <div class="form-group">
                <label for="location">Location:</label>
                <input type="text" name="text" class="form-control" placeholder="Location" required v-model='search.location'>
            </div>
            <div class="form-group">
                <button class="btn btn-submit btn-success" type="submit">Submit</button>
            </div>
        </form>
        <div v-for="event in events" class="row event-row">
            <div class="col-xs-offset-1 col-xs-10 col-sm-offset-1 col-sm-8">
                <!--<router-link :to="'events/'+event.id">
                    <h2>{{event.name}}</h2>
                    <h3>{{event.startDate}} - {{event.endDate}}</h3>
                    <h3>{{event.description}}</h3>
                </router-link>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'findEvents',
        data() {
            return {
                search: {
                    location: ''
                }
            }
        },
        computed: {
            events() {
                return this.$store.state.events
            }
        },
        methods: {
            findEvents() {
                this.$store.dispatch('findEvents', this.search.location)
                this.search.location = ''
            }
        }
    }
</script>

<style scoped>
    .event-row {
        border: 1px solid #000;
    }
</style>