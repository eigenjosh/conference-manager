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
                            <router-link :to="{name: 'findEvents'}">
                                <button type="button" class="btn btn-default">Find Events</button>
                            </router-link>
                        </li>
                        <div v-if="activeUser.hasOwnProperty('name')">
                            <li>
                                <router-link :to="{name:'mySchedule'}">
                                    <button type="button" class="btn btn-default">My Schedule</button>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'userNotes'}">
                                    <button type="button" class="btn btn-default">My Notes</button>
                                </router-link>
                            </li>
                        </div>
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

        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <h2 class="text-center">
                        <h1>User Notes</h1>
                    </h2>
                </div>
            </div>
            <div v-for="userNote in userNotes" class="row well">
                <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal2">
                    <div class="col-xs-12">
                        <h1>{{userNote.title}}</h1>
                    </div>
                </button>
                <!-- <div class="col-xs-12">
                    <h4>{{userNote.body}}</h4>
                </div> -->
            </div>
        </div>

        <div v-for="userNote in userNotes" class="modal-notes">
            <div id="myModal2" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4>{{userNote.title}}</h4>
                            <p>{{userNote.body}}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
                }
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
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            createNote() {
                this.$store.dispatch('createNote', this.note)
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
</style>