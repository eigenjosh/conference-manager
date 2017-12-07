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
    activeUser:{},
    schedule:{},
  },
  mutations: {
    handleError(state, err){
      state.error = err
    },
    setSchedule(state, activities){
      activities = activities.sort((a,b)=>{
       return Number(a.startTime) - Number(b.startTime)
      })
      activities.forEach(activity=>{
        if(!schedule.hasOwnProperty(activity.start)){
          schedule[activity.start]=[activity]
        }else{
          schedule[activity.start].push(activity)
        }
      })
    },
  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts

    handleError({commit, dispatch}, err){
      commit('handleError', err)
    },
    getActivities({commit, dispatch}, event){
      api('/events/'+ event._id + '/activites')
        .then(res =>{
          commit('setSchedule', activities)
        })
    }
  }

})


export default store
