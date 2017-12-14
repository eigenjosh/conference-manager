import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import socketStore from './socket-store'
import router from '../router'
import plugins from './plugins'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})

vue.use(vuex)

var store = new vuex.Store({
  state: {
    error: {},
    activeUser: {},
    schedule: {},
    userSchedule: {},
    events: [],
    myEvents: [],
    myActivities: [],
    activeEvent: {},
    userNotes: [{}],
    activeActivity: {},
    activeNote: {},
    adminEvents:[],
    timeSlots: [
      "12:00 AM",
      "12:30 AM",
      "1:00 AM",
      "1:30 AM",
      "2:00 AM",
      "2:30 AM",
      "3:00 AM",
      "3:30 AM",
      "4:00 AM",
      "4:30 AM",
      "5:00 AM",
      "5:30 AM",
      "6:00 AM",
      "6:30 AM",
      "7:00 AM",
      "7:30 AM",
      "8:00 AM",
      "8:30 AM",
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
      "5:00 PM",
      "5:30 PM",
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
      "7:30 PM",
      "8:00 PM",
      "8:30 PM",
      "9:00 PM",
      "9:30 PM",
      "10:00 PM",
      "10:30 PM",
      "11:00 PM",
      "11:30 PM"
    ],

  },
  mutations: {

    //SET USER
    setUser(state, user) {
      state.activeUser = user
    },
    resetState(state) {
      state.error = {},
        state.activeUser = {},
        state.schedule = {},
        state.userSchedule = {},
        state.events = [],
        state.myEvents = [],
        state.myActivities = [],
        state.activeEvent = {},
        state.userNotes = [{}],
        state.activeActivity = {},
        state.activeNote = {},
        state.adminEvents =[]
    },



    //HANDLE ERROR
    handleError(state, err) {
      state.error = err
    },

    //SET & DISPLAY SCHEDULE
    setSchedule(state, activities) {
      var schedule = {}
      activities = activities.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date)
      })
      activities.forEach(activity => {
        if (!schedule.hasOwnProperty(activity.date)) {
          schedule[activity.date] = {}
        }
      })
      activities = activities.sort((a, b) => {
        return parseInt(a.startTime) - parseInt(b.startTime)
      })
      activities.forEach(activity => {
        if (!schedule[activity.date].hasOwnProperty(activity.startTime)) {
          schedule[activity.date][activity.startTime] = [activity]
        } else {
          schedule[activity.date][activity.startTime].push(activity)
        }
      })
      state.schedule = schedule

    },
    //SET MYSCHEDULE

    setUserSchedule(state, activities) {
      var schedule = {}
      activities = activities.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date)
      })
      activities.forEach(activity => {
        if (!schedule.hasOwnProperty(activity.date)) {
          schedule[activity.date] = {}
        }
      })
      activities = activities.sort((a, b) => {
        return parseInt(a.startTime) - parseInt(b.startTime)
      })
      activities.forEach(activity => {
        if (!schedule[activity.date].hasOwnProperty(activity.startTime)) {
          schedule[activity.date][activity.startTime] = [activity]
        } else {
          schedule[activity.date][activity.startTime].push(activity)
        }
      })
      state.userSchedule = schedule

    },


    //SET EVENTS
    setEvents(state, data) {
      state.events = data
      console.log(state.events)
    },
    setMyEvents(state, data) {
      state.myEvents = data
      console.log(state.myEvents)
    },
    // setMyActivities(state, data) {
    //   state.myActivities = data
    //   console.log(state.myActivities)
    // },
    setActiveEvent(state, data) {
      state.activeEvent = {}
      state.activeEvent = data
    },
    setActiveActivity(state, data) {
      state.activeActivity = {}
      state.activeActivity = data
    },
    setTimeSlot(state, data) {
      state.timeSlots = data
    },
    // SET USER NOTES
    setUserNotes(state, data) {
      state.userNotes = data
    },

    // SET ACTIVE NOTE
    setActiveNote(state, note) {
      
      state.activeNote = {}
      state.activeNote = note
    },
    setAdminEvents(state, data){
      console.log()
      state.adminEvents = data
    }

  },
  actions: {

    //***LOGIN AND REGISTER***

    //LOGIN

    login({ commit, dispatch }, payload) {

      auth.post('login', payload)
        .then(res => {
          console.log("successful login")
          commit('setUser', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)

        })
    },

    //REGISTER

    register({ commit, dispatch }, payload) {

      auth.post('register', payload)
        .then(res => {
          commit('setUser', res.data.data)
        })
        .catch((err) => {
          { commit('handleError', err) }
        })
    },

    //AUTHENTICATE

    authenticate({ commit, dispatch }) {
      auth('authenticate')
        .then(res => {
          commit('setUser', res.data.data)

        })
        .catch((err) => {
          commit('handleError', err)
        })
    },

    //LOGOUT

    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then((user) => {
          user = {}

          commit('setUser', user)
          commit('resetState')
          router.push({ name: 'Home' })
        })
    },

    //*** EVENTS/ACTIVITIES ***/

    //GET ALL EVENTS

    getAllEvents({ commit, dispatch }) {
      api('/events')
        .then(res => {
          commit('setEvents', res.data.data)
        })
    },

    //GET ACTIVITIES BY EVENT ID

    getActivities({ commit, dispatch }, payload) {

      api('/events/' + payload._id + '/activities')
        .then(res => {
          commit('setSchedule', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    //GET EVENTS BY LOCATION

    findEvents({ commit, dispatch }, location) {
      api(`/find-events/${location}`)
        .then(res => {
          console.log('res to findEvents: ', res)
          commit('setEvents', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    //GET MY EVENTS (USER)

    getMyEvents({ commit, dispatch }) {
      api(`/user-events`)
        .then(res => {
          console.log('res to getMyEvents: ', res)
          commit('setMyEvents', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getMyActivities({ commit, dispatch }) {
      api(`/user-activities`)
        .then(res => {
          console.log('res to getMyActivities: ', res)
          commit('setMyActivities', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // CREATE NEW EVENT

    createEvent({ commit, dispatch }, event) {
      api.post('events/', event)
        .then(res => {
          console.log('res to create event: ', res.data.data)
          dispatch('getAllEvents')
          dispatch('getCreatedEvents')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // GET ACTIVITY BY ID
    getActivityById({ commit, dispatch }, activity) {
      api('activities/' + activity._id)
        .then(res => {
          commit('setActiveActivity', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // GET EVENT BY ID
    getEventById({ commit, dispatch }, event) {
      
      api('events/' + event._id)
        .then(res => {
          commit('setActiveEvent', res.data.data)
          dispatch('getActivities', {_id: event._id})
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // ADD ACTIVITY
    addActivity({ commit, dispatch }, payload) {
      payload.activity.eventId = payload.eventId
      api.post('activities', payload.activity)
        .then(res => {
          console.log(res)
          dispatch('getActivities', { _id: payload.activity.eventId })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    addToMySchedule({ commit, dispatch }, payload) {
      payload.user.activities.push(payload.activity._id)
      api.put('/user-activities', payload.user)
        .then(res => {
          console.log('activity has been added')
          dispatch('authenticate')
        })
        .catch(err => {
          commit('handleError', err)
        })

    },

    editActivity({ commit, dispatch }, activity) {
      api.put('activities/' + activity._id, activity)
        .then(res => {
          commit('setActiveActivity', res.data.data)
          dispatch('getActivities', { _id: activity.eventId })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // CREATE NOTE
    createNote({ commit, dispatch }, note) {
      
      api.post('notes', note)
        .then(res => {
          console.log(res)
          dispatch('getAllUserNotes')
          dispatch('getNotebyNoteId', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // GET ALL USER NOTES
    getAllUserNotes({ commit, dispatch }) {
      api.get('user-notes')
        .then(res => {
          console.log(res)
          commit('setUserNotes', res.data.data)
        })
    },

    //UPDATE NOTE
    updateNote({ commit, dispatch }, note) {
      api.put('notes/' + note._id, note)
        .then(res => {
          commit('setUserNotes', note)
          dispatch('getAllUserNotes', note)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // GET NOTE BY NOTE ID
    getNotebyNoteId({ commit, dispatch }, note) {
      
      api('notes/' + note._id)
        .then(res => {
          commit('setActiveNote', res.data.data)
          // dispatch('getAllUserNotes', note)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    //DELETE NOTE
    deleteNote({ commit, dispatch }, note) {
      api.delete('notes/' + note._id)
        .then(res => {
          dispatch('getAllUserNotes')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    deleteActivity({ commit, dispatch }, activity) {
      
      api.delete('activities/' + activity._id)
        .then(res => {
          console.log("delete request:", res)
          dispatch('getActivities', {_id: res.data.data.eventId})
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    addToMyEvents({ commit, dispatch }, payload) {
      payload.user.events.push(payload.event._id)

      api.put('/user-events', payload.user)
        .then(res => {
          console.log('this event has been added')
          dispatch('authenticate')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getMySchedule({ commit, dispatch }, event) {
      api('/user-events/' + event._id + '/activities')
        .then(res => {
          commit('setUserSchedule', res.data.data)
          commit('setActiveEvent', event)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    //VARIOUS DELETES

    deleteEvent({ commit, dispatch }, event) {
      
      api.delete('events/' + event._id)
        .then(res => {
          console.log('res to delete event: ', res.data.data)
          router.push('/admin-events')
          dispatch('getAllEvents')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    removeFromMySchedule({ commit, dispatch }, payload) {
      for (var i = 0; i < payload.user.activities.length; i++) {
        var activity = payload.user.activities[i]
        if (activity._id == payload.activity._id) {
          payload.user.activities.splice(i, 1)
          break
        }
      }
      api.put('/user-activities', payload.user)
        .then(res => {
          console.log('activity has been removed from user schedule')
          dispatch('authenticate')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getCreatedEvents({commit, dispatch}){
      api('/admin-events')
        .then(res =>{
          console.log('res to get created: ', res)
          console.log('res.data.data of get created: ', res.data.data)
          commit('setAdminEvents', res.data.data)
        })
        .catch(err=>{
          commit('handleError', err)
        })
    },

    removeFromMyEvents({ commit, dispatch }, payload) {
      var removedEvent
      for (var i = 0; i < payload.user.events.length; i++) {
        var event = payload.user.events[i]
        if (event._id == payload.event._id) {
          payload.user.events.splice(i, 1)
          var removedEvent = event
          break
        }
      }
      for (var i = 0; i < payload.user.activities.length; i++) {
        var activity = payload.user.activities[i]
        if (activity.eventId == removedEvent._id) {
          payload.user.activities.splice(i, 1)
          i--
        }
      }
      api.put('/user-events', payload.user)
        .then(res => {
          console.log('this event has been removed from user events')
          dispatch('authenticate')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    publishEvent({commit, dispatch}, event){
      api.put('/events/' + event._id, event)
        .then(res=>{
          dispatch('getAllEvents')
        })
        .catch(err=>{
          commit('handleError', err)
        })
    },

    //HANDLE ERROR
    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    },

  },

})


export default store
