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
      '8:00':[{name: 'im here', startTime: '0800'},{name:'display me', startTime: '0815'},{name: 'start new row??', startTime:'0830'}],
      '9:00':[{name: 'is this different?', startTime: '0900'},{name: 'i hope this worked', startTime:'0900'}]
    },
    userSchedule:{}
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
        return Number(a.startTime) - Number(b.startTime)
      })
      activities.forEach(activity => {
        if (!schedule.hasOwnProperty(activity.start)) {
          schedule[activity.start] = [activity]
        } else {
          schedule[activity.start].push(activity)
        }
      })
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
        .catch(err => { commit('handleError', err)
          
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
    }
  },

  //HANDLE ERROR
  handleError({ commit, dispatch }, err) {
    commit('handleError', err)
  },

})


export default store
