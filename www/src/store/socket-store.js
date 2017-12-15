import vue from 'vue'
import io from 'socket.io-client'
let socket = {}


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
            socket = io(baseUrl)
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
                commit(payload.mutation, payload)
            })

            socket.on('joinedRoom', room => {
                console.log('SETTING ROOM')
                commit('setRoom', room)
            })

            socket.on('leftRoom', room => {
                console.log('SETTING ROOM')
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
            socket.emit('update', payload)
        },
        joinRoom({ commit, dispatch }, roomName) {
            socket.emit('joinRoom', roomName)
        },
        leaveRoom({ commit, dispatch }, roomName) {
            socket.emit('leaveRoom', roomName)
        }
    }
}