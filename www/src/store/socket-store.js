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
            socket = io('//localhost:3000')
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
                if (payload.action) {
                    dispatch(payload.action, payload)
                }
                if (payload.mutation) {
                    commit(payload.mutation, payload)
                }
            })






        },
        emitData({ commit, dispatch }, payload) {
            debugger
            if (!payload.mutation) { return console.error("SOCKET ERROR: HEY YOU FORGOT TO ADD A MUTATION", payload) }

            socket.emit('update', payload)
        }
    }
}