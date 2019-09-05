<template lang="pug">
  .wrapper
    header
      .navbar
        .container
          .navbar-content
            .logo-container
              img.logo(
                src='./assets/logo.png'
              )
              router-link.header-logo(
                to="/"
              ) Eutrack24.com
            .button-burger(
              @click="menuShow = !menuShow"
              :class="{ active: menuShow }"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3
            .navbar-list__wrapper(
              :class="{ active: menuShow }"
            )
              ul.navbar-list
                li.navbar-item(
                  v-for="link in links"
                  :key="link.title"
                  @click="menuShow = false"
                )
                  router-link.navbar-link(
                    :to="`${link.url}`"
                  ) {{ link.title }}
                li.navbar-item(
                  v-if="checkUser"
                  @click="logout"
                )
                  span.navbar-link Logout

    router-view(:class="{blur: loading}")
    footer.footer__hr
      .container
        .logo-container__footer
          .logo__border
            img.logo.logo__footer(
            src='./assets/logo-1.jpg'
          )
          .logo__border
            img.logo.logo__footer(
            src='./assets/logo-2.jpg'
          )
          .logo__border
            img.logo.logo__footer(
            src='./assets/logo-3.jpg'
          )
          .logo__border
            img.logo.logo__footer(
            src='./assets/logo-4.jpg'
          )
          .logo__border
            img.logo.logo__footer(
            src='./assets/logo-5.jpg'
          )
          .logo__border
            img.logo.logo__footer(
            src='./assets/logo-6.jpg'
          )
          .logo__border
            img.logo.logo__footer(
            src='./assets/logo-7.jpg'
          )
          .logo__border
            img.logo.logo__footer(
            src='./assets/logo-8.jpg'
          )
    .footer__hr
      .container
        p Copyright © 2010-2019 eutrack24.com
    .preloader__wrapper(v-if="loading")
      .preloader1
      .preloader2
      .preloader3

    .ui-message(
      v-if="messageShow"
      :class="[{ 'ui-message--success': messageContext === 'success' }, { 'ui-message--danger': messageContext === 'error' }]")
      span.message-title {{ messageTitle }}

</template>

<script>
export default {
  data () {
    return {
      menuShow: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/track')
    }
  },
  computed: {
    checkUser () {
      return this.$store.getters.checkUser
    },
    links () {
      if (this.checkUserId) {
        return [
          {title: 'Home', url: '/'},
          {title: 'Track shipment', url: '/track'}
        ]
      }
      if (this.checkUser) {
        return [
          {title: 'Track shipment', url: '/track'}
        ]
      }
      return [
        {title: 'Track shipment', url: '/track'},
        {title: 'Login', url: '/login'},
        {title: 'Registration', url: '/registration'}
      ]
    },
    // Show loading status
    loading () {
      return this.$store.getters.loading
    },
    messageShow () {
      return this.$store.getters.message.show
    },
    messageTitle () {
      return this.$store.getters.message.title
    },
    messageContext () {
      return this.$store.getters.message.context
    }
  }
}
</script>

<style lang="stylus">
.logo-container__footer
  display flex
  flex-wrap wrap
.logo
  width 100px
  &__footer
    width 280px
    height 280px
    margin 10px
    padding 5px
    border 1px solid #ccc
    object-fit contain
.footer__hr
  border-top 1px solid #ccc
  margin-top 20px
  margin-bottom 10px
  padding-top 20px
@import './assets/stylus/main.styl'
</style>
