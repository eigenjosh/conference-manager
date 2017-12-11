import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import socketStore from './socket-store'
import router from '../router'

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
    activeEvent: {},
    userNotes: [{}],
    activeActivity: {}
  },
  mutations: {

    //SET USER
    setUser(state, user) {
      state.activeUser = user
      console.log(state.user)
    },

    //HANDLE ERROR
    handleError(state, err) {
      state.error = err
    },

    //SET & DISPLAY SCHEDULE
    setSchedule(state, activities) {
      activities = activities.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date)
      })
      activities.forEach(activity => {
        if (!state.schedule.hasOwnProperty(activity.date)) {
          state.schedule[activity.date] = {}
        }
      })
      activities = activities.sort((a, b) => {
        return parseInt(a.startTime) - parseInt(b.startTime)
      })
      activities.forEach(activity => {
        if (!state.schedule[activity.date].hasOwnProperty(activity.startTime)) {
          state.schedule[activity.date][activity.startTime] = [activity]
        } else {
          state.schedule[activity.date][activity.startTime].push(activity)
        }
      })

    },

    //SET EVENTS
    setEvents(state, data) {
      state.events = data
      console.log(state.events)
    },
    setActiveEvent(state, data) {
      state.activeEvent = {}
      state.activeEvent = data
    },
    setActiveActivity(state, data) {
      state.activeActivity = {}
      state.activeActivity = data
    },

    // SET USER NOTES
    setUserNotes(state, data) {
      state.userNotes = data
    }
  },
  actions: {

    //***LOGIN AND REGISTER***

    //LOGIN
    login({ commit, dispatch }, payload) {
      debugger
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
        .catch(() => {

        })
    },

    //LOGOUT
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then((user) => {
          user = {}
          commit('setUser', user)
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
    getActivities({ commit, dispatch }, event) {
      api('/events/' + event._id + '/activites')
        .then(res => {
          commit('setSchedule', activities)
        })
    },
    //GET EVENTS BY LOCATION
    findEvents({ commit, dispatch }, location) {
      api(`/findevents/${location}`)
        .then(res => {
          console.log('res to findEvents: ', res)
          commit('setEvents', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    //CREATE NEW EVENT
    createEvent({ commit, dispatch }, event) {
      api.post('events/', event)
        .then(res => {
          console.log('res to create event: ', res.data.data)
          dispatch('getAllEvents')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    getActivityById({ commit, dispatch }, activity) {
      api('activities/' + activity._id)
        .then(res => {
          commit('setActiveActivity', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    getEventById({ commit, dispatch }, event) {
      api('events/' + event._id)
        .then(res => {
          commit('setActiveEvent', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    addActivity({ commit, dispatch }, payload) {
      debugger
      api.post('activities', payload)
        .then(res => {
          console.log(res)
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
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // GET ALL USER NOTES
    getAllUserNotes({ commit, dispatch }) {
      api.get('usernotes')
        .then(res => {
          commit('setUserNotes', res.data.data)
        })
    },

    //HANDLE ERROR
    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    },

  },

})


export default store
