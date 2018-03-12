import vue from 'vue'
import io from 'socket.io-client'
let socket = {}

let base = window.location.host.indexOf('localhost') > -1 ? '//localhost:3000/' : '/'

export default {
    state: {
        connectedUsers: {},
        room: {}
    },
    mutations: {
        setUsers(state, users) {
            state.connectedUsers = users
        },
        addUser(state, user) {
            state.connectedUsers[user.userId] = user
        },
        addUserToRoom(state, user) {
            vue.set(state.room.users, user.userId, user)
        },
        removeUser(state, userId) {
            vue.delete(state.room.users, userId)
            delete state.connectedUsers[userId]
        },
        removeUserFromRoom(state, user) {
            console.log('called? remove user?')
            vue.delete(state.room.users, user.userId)
        },
        setRoom(state, room) {
            state.room = room
        }
    },
    actions: {
        initSocket({ commit, dispatch }, user) {
            socket = io(base)
            socket.on('CONNECTED', (data) => {
                socket.emit('setUser', user)
                console.log(data)
                commit('setUsers', data.connectedUsers)
            })
            socket.on('userConnected', user => {
                console.log('A new user has connected', user)
                commit('addUser', user)
            })
            socket.on('userDisconnected', userId => {
                commit('removeUser', userId)
            })
            socket.on('receiveUpdate', payload => {
                console.log("RECIEVING UPDATE:", payload)
                if (payload.action) {
                    if (payload.action == "getActivityById") {
                        
                        dispatch(payload.action, payload.activity)
                    }
                    else if (payload.action == "getActivities") {
                        dispatch(payload.action, { _id: payload.activity.eventId })
                    }
                    else {
                        dispatch(payload.action, payload)
                    }
                }
                if (payload.mutation) {
                    commit(payload.mutation, payload)
                }
            })
            socket.on('joinedRoom', room => {
                console.log('JOINED ROOM', room)
                commit('setRoom', room)
            })
            socket.on('leftRoom', room => {
                console.log('LEFT ROOM', room)
                commit('setRoom', room)
            })
            socket.on('userLeft', user => {
                commit('removeUserFromRoom', user)
            })
            socket.on('userJoined', user => {
                commit('addUserToRoom', user)
            })
        },
        emitData({ commit, dispatch }, payload) {
            if (!payload.mutation && !payload.action) { return console.error("SOCKET ERROR: HEY YOU FORGOT TO ADD A MUTATION", payload) }
            console.log('EMMITTING:', payload)
            socket.emit('update', payload)
        },
        joinRoom({ commit, dispatch }, roomName) {
            console.log("trying to join room", roomName)
            socket.emit('joinRoom', roomName)
        }
    }
}