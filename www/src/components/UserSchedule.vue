<template>
    <div>
        <div id="myActDetails" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">{{activeActivity.name}}</h4>
                    </div>
                    <div class="modal-body">
                        <h5>Date:{{activeActivity.date}} Times:{{activeActivity.startTime}}-{{activeActivity.endTime}}</h5>
                        <h4>ROOM:{{activeActivity.location}}</h4>
                        <h4> Seats Available: {{activeActivity.capacity}}</h4>
                        <h2>Speaker: {{activeActivity.speakerName}}</h2>
                        <h3>{{activeActivity.description}}</h3>
                        <!-- <h4>Seats Available: {{activeActivity.capacity}}</h4> -->
                    </div>
                    <div>
                        <button v-if="isCreated" class="btn btn-success" data-dismiss="modal" data-toggle="modal" data-target="#notepad" @click="setActiveNote">Edit My Note</button>
                        <button v-else class="btn btn-primary" data-dismiss="modal" data-toggle="modal" @click="saveNote" data-target="#notepad">Take Note</button>
                    </div>
                    <div class="modal-footer">
                        <button>Add to My Schedule</button>
                    </div>
                </div>

            </div>
        </div>
        <div id="notepad" class="modal fade notepad" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">{{activeNote.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <form type="submit">
                            <textarea name="myNotes" cols="70" rows="15" v-model="note.body">{{activeNote.body}}</textarea>
                        </form>
                    </div>
                    <div>
                        <button class="btn btn-primary" data-dismiss="modal" @click="updateNote(activeNote)">Save Note</button>

                    </div>
                    <div class="modal-footer">
                        <button>Add to My Schedule</button>
                    </div>
                </div>

            </div>
        </div>


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
                        <h3>{{time}}</h3>
                </div>
                <div class="col-xs-12 col-md-3" v-for="activity in activitiesList">
                    <button class="btn btn-primary activities" @click="setActiveActivity(activity, userNotes)" data-toggle="modal" data-target="#myActDetails">
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
                note: {
                    title: '',
                    body: ''
                },
                isCreated: false

            }
        },
        computed: {
            userSchedule() {
                return this.$store.state.userSchedule
            },
            activeEvent() {
                return this.$store.state.activeEvent
            },
            activeActivity() {
                return this.$store.state.activeActivity
            },
            activeNote() {
                return this.$store.state.activeNote
            },
            userNotes() {
                return this.$store.state.userNotes
            }


        },
        mounted() {
            this.$store.dispatch('getAllUserNotes', this.note.creatorId)
            this.$store.dispatch('getMySchedule', this.activeEvent)
        },
        methods: {
            setActiveActivity(activity, userNotes) {
                
                this.$store.dispatch('getActivityById', activity)
                this.isCreated = false
                for (var i = 0; i < userNotes.length; i++) {
                    var note = userNotes[i]
                    if (note.activityId == activity._id) {
                        return this.isCreated = true
                    }
                }
            },
            saveNote() {
                
                this.note.title = this.activeActivity.name
                this.note.body = ' '
                this.note.activityId = this.activeActivity._id
                this.$store.dispatch('createNote', this.note)
            },
            updateNote(activeNote) {
                activeNote.body = this.note.body
                this.$store.dispatch('updateNote', activeNote)
                this.note = {}
            },
            setActiveNote(){
                var activeNote
                for(var i=0; i<this.userNotes.length; i++){
                    var note = this.userNotes[i]
                    if(note.activityId == this.activeActivity._id){
                        activeNote = note
                    }
                }
                this.$store.dispatch('getNotebyNoteId', activeNote)
                this.note.body = activeNote.body
            }
            
            
        },

    }
</script>

<style>
    .notepad textarea {
        width: 100%;
    }
</style>