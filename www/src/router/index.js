import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import AdminEvents from 'components/AdminEvents'
import Notes from 'components/Notes'
import FindEvents from 'components/FindEvents'
import EventSchedule from 'components/EventSchedule'
import MySchedule from 'components/MySchedule'
import AdminEdit from 'components/AdminEdit'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin-events',
      name: 'adminEvents',
      component: AdminEvents
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
    {
      path: '/event-schedule/:id',
      name: 'eventSchedule',
      component: EventSchedule,
    },
    {
      path: '/my-schedule',
      name: 'mySchedule',
      component: MySchedule
    },
    {
    path: '/admin-edit/:id',
    name: 'adminEdit',
    component: AdminEdit
  },
  ]
})
