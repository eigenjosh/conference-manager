<template>
    <div class="container">
        <h2 class="text-center">{{event.name}}</h2>
        <div v-for="note in notes" class="row">
            <div class="col-xs-12">
                <button type="button" @click="dataToggle="modal"">
                    <h3>{{activity.name}}</h3>
                    <p>{{note.body}}</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'notes',
        computed: {
            events() {
                return this.$store.state.events
            },
            notes() {
                return this.$store.state.notes
            },
            activities()
        }
    }

</script>

<style>


</style>