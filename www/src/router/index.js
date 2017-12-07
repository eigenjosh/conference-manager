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
    
  ]
})
