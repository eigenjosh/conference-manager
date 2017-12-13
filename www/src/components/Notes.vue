<template>
    <div class="notes">

        <!-- BEGINNING OF NAVBAR -->

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
                        <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal">Create Note</button>
                        <button type="button" class="btn btn-danger navbar-btn" @click="logout">Logout</button>
                    </div>
                </div>

                <!-- MENU DROWDOWN -->
                <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">

                    <ul>
                        <li>
                            <router-link :to="{name:'Home'}">
                                <button type="button" class="btn btn-default">Home</button>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'adminEvents'}">
                                <button type="button" class="btn btn-default">Events I've Created</button>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'findEvents'}">
                                <button type="button" class="btn btn-default">Find Events</button>
                            </router-link>
                        </li>

                        <li>
                            <router-link :to="{name:'mySchedule'}">
                                <button type="button" class="btn btn-default">My Schedule</button>
                            </router-link>
                        </li>

                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>

        <!-- END OF NAVBAR -->

        <!-- ADD GENERAL NOTE MODAL -->

        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add a New Note</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="title">Note Title:</label>
                            <input type="text" name="title" class="form-control" placeholder="Title..." required v-model='note.title'>
                        </div>
                        <div class="form-group">
                            <label for="note-body"></label>
                            <textarea type="text" name="note-body" class="form-control" rows="5" placeholder="Add note..." required v-model="note.body"></textarea>
                            <button type="submit" class="btn btn-default" @click="createNote" data-dismiss="modal">Add Note</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

        <!-- DISPLAY USER NOTES -->
        <div class="container-fluid">
            <div v-if="!userNotes.activityId" class="row">
                <div class="col-xs-12">
                    <h2 class="text-center">
                        <h1>General User Notes</h1>
                    </h2>
                </div>
            </div>
            <div v-else class="row">
                    <div class="col-xs-12">
                        <h2 class="text-center">
                            <h1>Notes on Activities</h1>
                        </h2>
                    </div>
                </div>
            <div v-for="userNote in userNotes" class="row well">
                <button type="button" @click="setActiveNote(userNote)" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal2">
                    <div class="col-xs-12">
                        <h1>{{userNote.title}}</h1>
                    </div>
                </button>
            </div>
        </div>

        <!-- DISPLAY ACTIVE NOTE -->
        <div class="modal-notes">
            <div id="myModal2" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" @click="updateNote(activeNote)" data-dismiss="modal">&times;</button>
                            <button @click="removeNote(activeNote)" class="btn btn-danger btn-xs pull-left" type="button" data-dismiss="modal">Delete Note</button>
                            <div class="title-head">
                                <h4>{{activeNote.title}}</h4>
                            </div>
                            <div class="form-group">
                                <label for="note-body"></label>
                                <textarea type="text" name="note-body" class="form-control" rows="5" required v-model="note.body">{{activeNote.body}}</textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="updateNote(activeNote)" data-dismiss="modal">Save Note</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'userNotes',
        data() {
            return {
                note: {
                    title: '',
                    body: ''
                },
                onActivity: false
            }
        },
        mounted() {
            this.$store.dispatch('getAllUserNotes', this.note.creatorId)

        },
        computed: {
            activeUser() {
                return this.$store.state.activeUser
            },
            userNotes() {
                return this.$store.state.userNotes
            },
            activeNote() {
                return this.$store.state.activeNote
            },

        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            createNote() {
                this.$store.dispatch('createNote', this.note)
                this.note = {}
            },
            updateNote(activeNote) {
                activeNote.body = this.note.body
                this.$store.dispatch('updateNote', activeNote)
                this.note = {}
            },
            removeNote(activeNote) {
                this.$store.dispatch('deleteNote', activeNote)
            },
            setActiveNote(userNote) {
                this.note.body = userNote.body
                this.$store.dispatch('getNotebyNoteId', userNote)
            },
        }
    }

</script>

<style>
    .row {
        text-align: center;
    }

    .container {
        text-align: center;
    }

    .title-head {
        text-align: center;
    }
</style>