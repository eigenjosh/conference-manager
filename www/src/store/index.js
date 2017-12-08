import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
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
    schedule: {
      '2017-12-08':{
        '8:00': [{ name: 'im here', startTime: '0800', endTime:'0900', date:'2017-12-08' }, { name: 'display me', startTime: '0815', endTime:'0900', date:'2017-12-08' }, { name: 'start new row??', startTime: '0830', endTime:'0930', date:'2017-12-08' }],
        '9:00': [{ name: 'is this different?', startTime: '0900', endTime:'1000', date:'2017-12-08' }, { name: 'i hope this worked', startTime: '0900', endTime:'1000', date:'2017-12-08' }]
      },
      '2017-12-09':{
        '8:00': [{ name: 'im here', startTime: '0800' , endTime:'0900', date:'2017-12-09'}, { name: 'display me', startTime: '0815' , endTime:'0900', date:'2017-12-09'}, { name: 'start new row??', startTime: '0830', endTime:'0930', date:'2017-12-09' }],
        '9:00': [{ name: 'is this different?', startTime: '0900' , endTime:'1000', date:'2017-12-09'}, { name: 'i hope this worked', startTime: '0900', endTime:'1000', date:'2017-12-09' }]
      }
    },
    userSchedule: {},
    events: [],
    activeEvent: {}
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
      activities.forEach(activity =>{
        if(!state.schedule.hasOwnProperty(activity.date)){
          state.schedule[activity.date] = {}
        }
      })
      activities = activities.sort((a, b) => {
        return parseInt(a.startTime) - parseInt(b.startTime)
      })
      activities.forEach(activity =>{
        if(!state.schedule[activity.date].hasOwnProperty(activity.startTime)){
          state.schedule[activity.date][activity.startTime] = [activity]
        }else{
          state.schedule[activity.date][activity.startTime].push(activity)
        }
      })

    },
    //SET EVENTS
    setEvents(state, data) {
      state.events = data
      console.log(state.events)
    },
  },
  actions: {

    //LOGIN AND REGISTER

    //LOGIN
    login({ commit, dispatch }, payload) {
      debugger
      auth.post('login', payload)
        .then(res => {
          console.log("successful login")
          commit('setUser', res.data.data)
          router.push({ name: 'Home' })
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
          router.push({ name: 'Home' })
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
          router.push({ name: 'Home' })
        })
        .catch(() => {
          router.push({ name: 'Home' })
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
    }
   
  },


  //HANDLE ERROR
  handleError({ commit, dispatch }, err) {
    commit('handleError', err)
  },

})


export default store
