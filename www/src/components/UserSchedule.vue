<template>
    <div>
        <div id="myActDetails" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">{{activeActivity.name}}</h2>
                    </div>
                    <div class="modal-body">
                        <h5>{{formatDateForDisplay(activeActivity.date)}}</h5>
                        <h5>{{activeActivity.startTime}} - {{activeActivity.endTime}}</h5>
                        <h4>Room: {{activeActivity.location}}</h4>
                        <h4 v-if="activeActivity.capacity"> Seats Available: {{activeActivity.capacity}}</h4>
                        <h4>Speaker: {{activeActivity.speakerName}}</h4>
                        <h4>{{activeActivity.description}}</h4>
                        <!-- <h4>Seats Available: {{activeActivity.capacity}}</h4> -->
                    </div>
                    <div>
                        <button v-if="isCreated" class="btn btn-success" data-dismiss="modal" data-toggle="modal" data-target="#notepad" @click="setActiveNote">Edit My Note</button>
                        <button v-else class="btn btn-primary" data-dismiss="modal" data-toggle="modal" @click="saveNote" data-target="#notepad">Take Note</button>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <button data-dismiss="modal" @click="removeActivity">Remove Activity from My Schedule</button>
                            </ul>
                        </div>
                        <!-- <button class="btn btn-danger" @click="removeActivity" data-dismiss="modal">Remove from Schedule</button> -->
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
            <div class="col-xs-12 event well" v-if="activeUser.events.includes(activeEvent._id)">
                <router-link :to="{path: 'event-schedule/' + activeEvent._id}" class="event-name">
                    <button class="btn event-name-btn">
                        <h2>{{activeEvent.name}}</h2>
                    </button>
                </router-link>
                <br>
                <!-- <button class="btn btn-danger btn-sm remove" @click="removeEvent">REMOVE EVENT FROM MY SCHEDULE</button> -->
            </div>
        </div>
        <div v-if="activeEvent" class="row">
            <div class="col-xs-1">
                <div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <button data-dismiss="modal" @click="removeEvent">Remove Event from My Schedule</button>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row" v-for="(timeDict, date) in userSchedule">
            <div class="col-xs-12 text-left date-col">
                <h3>{{formatDateForDisplay(date)}}</h3>
            </div>
            <div class="row" v-for="(activitiesList, time) in userSchedule[date]">
                <div class="col-xs-6 col-xs-offset-1 col-md-1 time-col">
                    <h3>{{time}}</h3>
                </div>
                <div class="col-xs-12 col-md-9">
                    <div class="row button-list">
                        <div class="col-xs-12 col-md-4" v-for="activity in activitiesList">
                            <button class="btn  activities" @click="setActiveActivity(activity, userNotes)" data-toggle="modal" data-target="#myActDetails">
                                <h5>{{formatDateForDisplay(activity.date)}} {{activity.startTime}} - {{activity.endTime}}</h5>
                                <h4>{{activity.name}}</h4>
                            </button>
                        </div>
                    </div>
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
            },
            activeUser() {
                return this.$store.state.activeUser
            }


        },
        mounted() {
            this.$store.dispatch('getAllUserNotes', this.note.creatorId)
            this.$store.dispatch('getMySchedule', this.activeEvent)
        },
        methods: {
            formatDateForDisplay(date) {
                if (date) {
                    var parts = date.split('-')
                    let newDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toLocaleString('en-US');
                    return newDate.split(',')[0]
                }
            },
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
            setActiveNote() {
                var activeNote
                for (var i = 0; i < this.userNotes.length; i++) {
                    var note = this.userNotes[i]
                    if (note.activityId == this.activeActivity._id) {
                        activeNote = note
                    }
                }
                this.$store.dispatch('getNotebyNoteId', activeNote)
                this.note.body = activeNote.body
            },
            removeActivity() {
                if (this.activeActivity.capacity) {
                    this.activeActivity.capacity++
                    this.$store.dispatch('editActivity', { activity: this.activeActivity, emit: true })
                }
                this.$store.dispatch('removeFromMySchedule', { user: this.activeUser, event: this.activeEvent, activity: this.activeActivity })
            },
            removeEvent() {
                this.$store.dispatch('removeFromMyEvents', { user: this.activeUser, event: this.activeEvent, userSchedule: this.userSchedule })
            }



        },

    }
</script>

<style>
    .notepad textarea {
        width: 100%;
    }

    /* .date-col{
        padding-left: 40px;
        border-bottom: 1px solid #7F7F71;
        border-top: 1px solid #7F7F71;
        background: #7F7F71;
        color:whitesmoke;
    } */

    .time-col {
        border-right: 1px solid black;
        border-bottom: 1px solid black;
    }

    .well:hover .remove {
        display: inline-block;
    }

    .remove {
        display: none;
    }

    /* .activities{
        margin-top:5px;
        margin-bottom: 5px;
        background-color:#CBCCB4;
        color: rgba(12, 12, 12, 0.657);
    } */

    .event {
        height: 130px;
    }

    .event button {
        margin-right: 20px;
    }

    .well {
        margin-top: 5px;
        background-color: rgba(203, 204, 180, 0);
        border-top: 1px solid #CBCCB4;
    }

    .well h2 {
        color: whitesmoke;
    }

    /* .event-name-btn{
        background-color: rgba(127, 127, 113, 0.746);
        color: whitesmoke;
    } */

    .event-name:hover {
        text-decoration: none;
        text-shadow: 0px 0px 15px #7F7F7F
    }
</style>