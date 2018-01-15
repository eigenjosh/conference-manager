<template>
    <div class="notes">

        <!-- BEGINNING OF NAVBAR -->

        <nav class="navbar navbar-inverse navbar-fixed-top">
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
                    <router-link :to="{name: 'Home'}">
                        <a class="navbar-brand" style="font-family: 'Abril Fatface', cursive">Confer</a>
                    </router-link>
                    <div class="text-right">
                        <p class="navbar-text">Welcome {{activeUser.name}}</p>
                        <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal">Create Note</button>
                        <button type="button" class="btn logout-color navbar-btn logout-btn btn-square" @click="logout">Logout</button>
                    </div>
                </div>

                <!-- MENU DROWDOWN -->
                <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">

                    <ul>
                        <li>
                            <router-link :to="{name:'Home'}">
                                <button type="button" class="btn btn-default nav-drop-btn">Home</button>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'adminEvents'}">
                                <button type="button" class="btn btn-default nav-drop-btn">Edit Events</button>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'findEvents'}">
                                <button type="button" class="btn btn-default nav-drop-btn">Find Events</button>
                            </router-link>
                        </li>

                        <li>
                            <router-link :to="{name:'mySchedule'}">
                                <button type="button" class="btn btn-default nav-drop-btn">My Schedule</button>
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
                            <input type="text" name="title" maxlength="40" class="form-control" placeholder="Title..." required v-model='note.title'>
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
        <div class="draw-notes">
            <div class="row">
                <div class="col-xs-6 well">
                    <h3 class="main-headline" style="font-size: 80px">General Notes</h3>
                    <div v-for="userNote in userNotes">
                        <div v-if="!userNote.activityId" class="row">
                            <button type="button" @click="setActiveNote(userNote)" class="btn btn-default note-btn word-wrap" data-toggle="modal" data-target="#myModal2">
                                <div class="col-xs-12">
                                    <h3>{{userNote.title}}</h3>
                                </div>
                            </button>
                        </div>
                        <div v-else class="else">
                        </div>
                    </div>
                </div>
                <div class="col-xs-6 well">
                    <h3 class="main-headline" style="font-size: 80px">Activity Notes</h3>
                    <div v-for="userNote in userNotes">
                        <div v-if="userNote.activityId" class="row">
                            <button type="button" @click="setActiveNote(userNote)" class="btn btn-default note-btn word-wrap" data-toggle="modal" data-target="#myModal2">
                                <div class="col-xs-12">
                                    <h3>{{userNote.title}}</h3>
                                </div>
                            </button>
                        </div>
                        <div v-else class="else">
                        </div>
                    </div>
                </div>
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
            }
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

    .note-btn {
        background-color: lightgray;
        width: 50%;
        margin-bottom: 5px;
    }

    .nav-btn-defaults {
        width: 15%;
    }
</style>