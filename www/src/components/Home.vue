<template>
    <div class="home">
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
                </div>

                <!-- MENU DROWDOWN -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">MENU
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <button type="button" class="btn navbar-btn">Find Events</button>
                                </li>
                                <li>
                                    <button type="button" class="btn navbar-btn">Event Schedule</button>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <button type="button" class="btn navbar-btn">My Schedule</button>
                                </li>
                                <li>
                                    <button type="button" class="btn navbar-btn">My Notes</button>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <button type="button" class="btn navbar-btn">Login</button>
                                </li>
                                <li>
                                    <button type="button" class="btn navbar-btn">Logout</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <!-- SEARCH BAR -->
                    <form class="navbar-form navbar-left">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search">
                        </div>
                        <!-- SUBMIT BUTTON -->
                        <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <!-- LOGIN BUTTON -->

                        <!-- Trigger the LOGIN modal -->
                        <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal">Login</button>

                        <!-- Trigger the SIGN UP modal -->
                        <button type="button" class="btn btn-success navbar-btn" data-toggle="modal" data-target="#myModal2">Sign-up</button>

                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>

        <div class="jumbotron main-pic">
            <div class="row">
                <div class="col-xs-12">
                    <h1>Welcome to Confer: A Conference Manager Application designed to dynamically handle schedules for events.</h1>
                </div>
            </div>
        </div>
        <!-- LOGIN MODAL -->

        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Sign in to your account</h4>
                    </div>
                    <div class="modal-body">
                        <form id="login" class="form" @submit.prevent="">
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" name="email" class="form-control" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" name="password" class="form-control" placeholder="password">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-success" type="submit">Submit</button>
                            </div>
                        </form>
                        <h3>Don't have an account?
                            <router-link :to="{name: ''}" class="register">Create an account</router-link>
                        </h3>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

        <!-- SIGN UP MODAL -->

        <div id="myModal2" class="modal fade" role="dialog">
                <div class="modal-dialog">
    
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Create a Confer Account</h4>
                        </div>
                        <div class="modal-body">
                            <form id="login" class="form" @submit.prevent="">
                                <div class="form-group">
                                    <label for="email">Email:</label>
                                    <input type="email" name="email" class="form-control" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password:</label>
                                    <input type="password" name="password" class="form-control" placeholder="password">
                                </div>
                                <div class="form-group">
                                        <label for="reEnterPassword">Re-enter Password:</label>
                                        <input type="password" name="reEnterPassword" class="form-control" placeholder="Re Enter Password">
                                    </div>
                                <div class="form-group">
                                    <button class="btn btn-submit btn-success" type="submit">Submit</button>
                                </div>
                            </form>
                            <h3>Already have an account?
                                <router-link :to="{name: ''}" class="register">Login Here</router-link>
                            </h3>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
    
                </div>
            </div>

    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
            }
        },
        components: {
        }
    }
</script>

<style>
    .main-pic {
        background-image: url('http://www.memorymakersevents.com/my_uploads/2017/10/conferencea-.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .jumbotron {
        color: whitesmoke;
        text-shadow: 0px 0px 10px black;
    }

    @media (max-width: 2000px) {
        .navbar-header {
            float: none;
        }
        .navbar-toggle {
            display: block;
        }
        .navbar-collapse {
            border-top: 1px solid transparent;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .navbar-collapse.collapse {
            display: none!important;
        }
        .navbar-collapse.collapse.in {
            display: block!important;
        }
        .navbar-nav {
            float: none!important;
            margin: 7.5px -15px;
        }
        .navbar-nav>li {
            float: none;
        }
        .navbar-nav>li>a {
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }
</style>