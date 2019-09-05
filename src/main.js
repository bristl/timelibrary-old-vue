// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'

import App from './App'
import router from './router'
import store from './store'

// Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// Dont need it
// import 'firebase/messaging'
// import 'firebase/storage'

Vue.use(
  Vuelidate,
  Uimini
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // Configuration
    let config = {
      apiKey: 'AIzaSyD962eY6CNKKvk7aFfVL2Q1QFAI662rV1o',
      authDomain: 'tracking-number-b38d4.firebaseapp.com',
      databaseURL: 'https://tracking-number-b38d4.firebaseio.com',
      projectId: 'tracking-number-b38d4',
      storageBucket: '',
      messagingSenderId: '348306440303',
      appId: '1:348306440303:web:b2bcc4e6e5e506c3'
    }
    // Firebase Initialize
    firebase.initializeApp(config)
    this.$store.dispatch('loadTasks')
    // Loading All Tags
    this.$store.dispatch('loadTags')
    // Auth Check
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Check Logged
        this.$store.dispatch('loggedUser', user)
        // Loading All Tasks
        this.$store.dispatch('loadTasks')
        // Loading All Tags
        this.$store.dispatch('loadTags')
        console.log(this.$store.getters.message.title)
      }
    })
  }
})
