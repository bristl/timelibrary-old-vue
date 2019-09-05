import firebase from 'firebase/app'

import User from './user_help'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    // Registration page
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // logic
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    // Login page
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // logic
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    // Logged
    loggedUser ({commit}, payload) {
      // Send mutation new uid used helped Class
      commit('setUser', new User(payload.uid))
    },
    // Logout
    logoutUser ({commit}) {
      firebase.auth().signOut()
      // Send mutation null
      commit('setUser', null)
    }
  },
  getters: {
    // Return user (for get id)
    user (state) {
      return state.user
    },
    // Check User (for logged)
    checkUserId (state) {
      if (state.user !== null) console.log(state.user.id)
      if (state.user !== null) return state.user.id === 'oRoTqFJchVdAHALqmc9vfrWvI0p2'
      return state.user !== null
    },
    checkUser (state) {
      return state.user !== null
    }
  }
}
