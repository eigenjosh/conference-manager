import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import socketStore from './socket-store'
import router from '../router'
import plugins from './plugins'

let base = window.location.host.indexOf('localhost') > -1 ? '//localhost:3000/' : '/'

let api = axios.create({
  baseURL: base + 'api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: base,
  timeout: 2000,
  withCredentials: true
})

vue.use(vuex)

var store = new vuex.Store({
  state: {
    error: {},
    success:{},
    activeUser: {},
    collaborators: [],
    activeCollaborator:{},
    schedule: {},
    userSchedule: {},
    events: [],
    myEvents: [],
    myActivities: [],
    activeEvent: {},
    userNotes: [{}],
    activeActivity: {},
    activeNote: {},
    adminEvents: [],
    timeSlots: [
      "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"],
    locations: {
      "Alaska": "AK", "Alabama": "AL", "Arkansas": "AR", "American Samoa": "AS", "Arizona": "AZ", "California": "CA", "Colorado": "CO", "Connecticut": "CT", "District of Columbia": "DC", "Delaware": "DE", "Florida": "FL", "Micronesia": "FM", "Georgia": "GA", "Guam": "GU", "Hawaii": "HI", "Iowa": "IA", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Massachusetts": "MA", "Maryland": "MD", "Maine": "ME", "Marshall Islands": "MH", "Michigan": "MI", "Minnesota": "MN", "Missouri": "MO", "Northern Marianas": "MP", "Mississippi": "MS", "Montana": "MT", "North Carolina": "NC", "North Dakota": "ND", "Nebraska": "NE", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "Nevada": "NV", "New York": "NY", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "Puerto Rico": "PR", "Palau": "PW", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Virginia": "VA", "Virgin Islands": "VI", "Vermont": "VT", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"
    },
    timeZones: ["Hawaii", "Alaska", "Pacific", "Mountain", "Central", "Eastern"]
    
  },
  modules: {
    socketStore
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
        state.adminEvents = []
    },



    //HANDLE ERROR
    handleError(state, err) {
      debugger
      vue.set(state, "error", err)
    },
    setSuccess(state, data){
      vue.set(state, "success", data)
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
        return state.timeSlots.indexOf(a.startTime) - state.timeSlots.indexOf(b.startTime)
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
      console.log("setUserSched", activities)
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
        return state.timeSlots.indexOf(a.startTime) - state.timeSlots.indexOf(b.startTime)
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
    addOrUpdateEvent(state, data) {
      
      var i = state.events.findIndex(e => e._id == data.event._id)
      if (i > -1) {
       vue.set(state.events, i, data.event)
      }else{
        state.events.push(data.event)
      }

    },
    removeEvent(state, data){
      for(var i=0; i< state.events.length; i++){
        var event = state.events[i]
        if(event._id == data.event._id){
          state.events.splice(i,1)
          return
        }
      }
    },
    setEvents(state, data) {
      state.events = data
      console.log(state.events)
    },
    setMyEvents(state, data) {
      state.myEvents = data
      console.log(state.myEvents)
    },
    //COLLABORATORS
    setCollabs(state, data){
      console.log(data)
      state.collaborators = data
    },
    setMyActivities(state, data) {
      state.myActivities = data
      console.log(state.myActivities)
    },
    setActiveEvent(state, data) {
      state.activeEvent = {}
      state.activeEvent = data
    },
    
    setActiveActivity(state, data) {
      vue.set(state, "activeActivity", data)
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
    setAdminEvents(state, data) {
      console.log()
      state.adminEvents = data
    }

  },
  actions: {

    //***LOGIN AND REGISTER***

    //LOGIN
    setSuccess({commit, dispatch}){
      commit('setSuccess', {})
    },
    setError({commit, dispatch}){
      commit('handleError', {})
    },
    login({ commit, dispatch }, payload) {
      debugger
      auth.post('login', payload)
        .then(res => {
          debugger
          console.log("successful login")
          commit('setUser', res.data.data)
          commit('setSuccess', res.data.message)
          dispatch('initSocket', res.data.data)
        })
        .catch(err => {
          debugger
          commit('handleError', err.response.data.message)
        })
    },

    //REGISTER

    register({ commit, dispatch }, payload) {

      auth.post('register', payload)
        .then(res => {
          commit('setUser', res.data.data)
          dispatch('initSocket', res.data.data)
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
          dispatch('initSocket', res.data.data)

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
      api('/find-events')
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
          commit('setUserSchedule', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // CREATE NEW EVENT

    createEvent({ commit, dispatch }, payload) {
      
      api.post('events/', payload.event)
        .then(res => {
          console.log('res to create event: ', res.data.data)
          dispatch('getAllEvents')
          dispatch('getCreatedEvents')
          dispatch('addToMyEvents', { user: payload.user, event: res.data.data })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    // ADD COLLABORATORS
    addCollab({commit,dispatch}, payload){
      api.put('add-collaborator/'+ payload.event._id, payload)
        .then(res=>{
          console.log(res)
          dispatch('getCollabs', payload.event)
        })
        .catch(err=>{
          commit('handleError', err)
        })
    },
    // GET COLLABORATORS
    getCollabs({commit, dispatch}, event){
      console.log(event)
      api('events/'+ event._id + '/collaborators')
        .then(res =>{
          console.log(res)
          commit('setCollabs',res.data.data)
        })
        .catch(err=>{
          commit('handleError', err)
        })
    },
    //DELETE COLLABORATOR
    removeCollab({commit, dispatch}, payload){
      api.put('remove-collaborator/'+ payload.event._id, payload)
        .then(res=>{
          console.log('remove collab', res)
          dispatch('getCollabs', payload.event)
        })
        .catch(err=>{
          commit('handleError', err)
        })
    },
    // GET ACTIVITY BY ID
    getActivityById({ commit, dispatch }, activity) {
      api('activities/' + activity._id)
        .then(res => {
          commit('setActiveActivity', res.data.data)
          dispatch('joinRoom', activity._id)
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
          dispatch('getActivities', { _id: event._id })
          dispatch('joinRoom', event._id)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // GET ADMIN EVENT BY ID
    getAdminEventById({ commit, dispatch }, event) {
      api('admin-events/' + event._id)
        .then(res => {
          commit('setActiveEvent', res.data.data)
          dispatch('getActivities', { _id: event._id })
          dispatch('joinRoom', event._id)
          if (!res.data.data) {
            router.push(`/event-schedule/${event._id}`)
          }
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
          if (payload.emit) {
            payload.action = 'getActivities'
            dispatch('emitData', payload)
          }
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
          if(payload.emit){
            payload.action = 'getActivityById'
            dispatch('emitData', payload)
          }
        })
        .catch(err => {
          commit('handleError', err)
        })

    },
    editEvent({ commit, dispatch }, payload) {
      api.put('events/' + payload.event._id, payload.event)
        .then(res => {
          commit('setActiveEvent', payload.event)
          
          if (payload.emit) {
            payload.mutation = 'addOrUpdateEvent' 
            dispatch('emitData', payload)
          }
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    editActivity({ commit, dispatch }, payload) {
      
      api.put('activities/' + payload.activity._id, payload.activity)
        .then(res => {
          commit('setActiveActivity', payload.activity)
          dispatch('getActivities', { _id: payload.activity.eventId })
          if (payload.emit) {
            payload.action = 'getActivityById' 
            dispatch('emitData', payload)
            payload.action = "getActivities"
            dispatch('emitData', payload)
          }
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
    deleteActivity({ commit, dispatch }, payload) {

      api.delete('activities/' + payload.activity._id)
        .then(res => {
          console.log("delete request:", res)
          dispatch('getActivities', { _id: res.data.data.eventId })
          if (payload.emit) {
            payload.action = 'getActivities' 
            dispatch('emitData', payload)
            payload.action = 'getActivityById'
            dispatch('emitData', payload)
          }
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
          console.log('getMySchedule',res)
          commit('setUserSchedule', res.data.data)
          commit('setActiveEvent', event)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    //VARIOUS DELETES

    deleteEvent({ commit, dispatch }, payload) {
      
      api.delete('events/' + payload.event._id)
        .then(res => {
          console.log('res to delete event: ', res.data.data)
          router.push('/admin-events')
          dispatch('getAllEvents')
          if (payload.emit) {
            payload.action = 'getAllEvents'
            dispatch('emitData', payload)
          }
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
//REMOVE ACTIVITIES FROM MY SCHEDULE
    removeFromMySchedule({ commit, dispatch }, payload) {
      for (var i = 0; i < payload.user.activities.length; i++) {
        var activity = payload.user.activities[i]
        if (activity == payload.activity._id) {
          payload.user.activities.splice(i, 1)
          break
        }
      }
      api.put('/user-activities', payload.user)
        .then(res => {
          console.log('activity has been removed from user schedule')
          dispatch('authenticate')
          dispatch('getMySchedule', payload.event)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getCreatedEvents({ commit, dispatch }) {
      api('/admin-events')
        .then(res => {
          console.log('res to get created: ', res)
          console.log('res.data.data of get created: ', res.data.data)
          commit('setAdminEvents', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
//REMOVE EVENT FROM MY SCHEDULE
    removeFromMyEvents({ commit, dispatch }, payload) {
      api.put('/user-events/' + payload.event._id, payload.event)
        .then(res => {
          console.log('this event has been removed from user events')
          dispatch('authenticate')
          dispatch('getMyEvents')
          dispatch('getMySchedule', payload.event)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    publishEvent({ commit, dispatch }, payload) {
      api.put('/events/' + payload.event._id, payload.event)
        .then(res => {
          dispatch('getAllEvents')
          if (payload.emit && payload.event.published) {
            payload.mutation = 'addOrUpdateEvent' 
            dispatch('emitData', payload)
          }
          if(payload.emit && !payload.event.published){
            payload.mutation = 'removeEvent'
            dispatch('emitData', payload)
          }
        })

        .catch(err => {
          commit('handleError', err)
        })
    },

    //HANDLE ERROR
    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    }

  }

})


export default store