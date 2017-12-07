import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import AdminEvent from 'components/AdminEvent'
import Notes from 'components/Notes'
import FindEvents from 'components/FindEvents'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
<<<<<<< HEAD
=======
    
>>>>>>> 3d29b63f2b2bb66807592efa22b459bf9d2d07e3
    {
      path: '/admin-event',
      name: 'adminEvent',
      component: AdminEvent
    },
    {
      path: '/user-notes',
      name: 'userNotes',
      component: Notes
    },
    {
      path: '/find-events',
      name: 'findEvents',
      component: FindEvents
    },
<<<<<<< HEAD
    {
      path: '/event-schedule',
      name: 'eventSchedule',
      component: EventSchedule
    },
    {
      path: '/my-schedule',
      name: 'mySchedule',
      component: MySchedule
    },
   
=======
    
>>>>>>> 3d29b63f2b2bb66807592efa22b459bf9d2d07e3
  ]
})
