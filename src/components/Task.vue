<template lang="pug">
  .content-wrapper
    section
      .container
        .task-list__header
          h1.ui-title-1 You can check the delivery status of your parcel. <br> Simple & easy!

          //- // Filter
          //- .buttons-list
          //-   .button.button--round.button-default(
          //-     @click="filter = 'active'"
          //-   ) Active
          //-   .button.button--round.button-default(
          //-     @click="filter = 'completed'"
          //-   ) Completed
          //-   .button.button--round.button-default(
          //-     @click="filter = 'all'"
          //-   ) All

        .form-item
            input(
              type="text"
              placeholder="Enter your track number"
              v-model='track'
              @keyup.enter="tasksFilter"
            )
        // Tasl load
        .task-list
          transition-group(name="taskList")
            .task-item(
              v-for="task in tasksFilter"
              :key="task.id"
              :class="{ completed: task.completed }"
            )
              .ui-card.ui-card--shadow
                .task-item__info
                  .task-item__main-info
                    span.ui-label(
                      :class="[{ 'ui-label--primary': !task.completed }, { 'ui-label--light': task.completed  }]"
                    ) weight: {{ task.weight }}
                    span Time left approximately: {{ 31 - totalTime() }} days
                  //- span.button-close(
                  //-   @click="deleteTask(task.id)"
                  //- )
                .task-item__content
                  .task-item__header
                    //- .ui-checkbox-wrapper
                    //-   input.ui-checkbox(
                    //-     type="checkbox"
                    //-     v-model="task.completed"
                    //-     @click="taskCompleted(task.id, task.completed)"
                    //-   )
                    span.ui-title-4 {{ task.title }}

                  .task-item__body
                    p.ui-text-regular.ui-text-day {{ task.description }}
                    p.ui-text-regular.ui-text-day {{ elapseTime(0) }} <br> Received by mail
                    p(
                      v-if='totalTime() > 3'
                    ).ui-text-regular.ui-text-day {{ elapseTime(3) }} <br> Arrived at the border of {{ task.contryShip }}
                    p(
                      v-if='totalTime() > 5'
                    ).ui-text-regular.ui-text-day {{ elapseTime(5) }} <br> Awaiting shipment from {{ task.contryShip }}
                    p(
                      v-if='totalTime() > 7'
                    ).ui-text-regular.ui-text-day {{ elapseTime(7) }} <br> Left the border of {{ task.contryShip }}
                    p(
                      v-if='totalTime() > 13'
                    ).ui-text-regular.ui-text-day {{ elapseTime(13) }} <br> Arrived in {{ task.contryDel }}
                    p(
                      v-if='totalTime() > 15'
                    ).ui-text-regular.ui-text-day {{ elapseTime(15) }} <br> Registration completed
                    p(
                      v-if='totalTime() > 19'
                    ).ui-text-regular.ui-text-day {{ elapseTime(19) }} <br> Arrived at customs
                    p(
                      v-if='totalTime() > 22'
                    ).ui-text-regular.ui-text-day {{ elapseTime(22) }} <br> Left customs
                    p(
                      v-if='totalTime() > 25'
                    ).ui-text-regular.ui-text-day {{ elapseTime(25) }} <br> Sent with delivery to {{ task.contryDel }}
                    p(
                      v-if='totalTime() > 29'
                    ).ui-text-regular.ui-text-day {{ elapseTime(29) }} <br> Arrived in the sorting center of the city of {{ task.cityDel }}
                    p(
                      v-if='totalTime() > 31'
                    ).ui-text-regular.ui-text-day {{ elapseTime(31) }} <br> Came to the place of delivery
                  .task-item__foter

                    // Tags load
                    .tag-list
                      .ui-tag__wrapper(
                        v-for="tag in task.tags"
                        :key="tag.title"
                      )
                        .ui-tag
                          span.tag-title {{ tag.title }}

                      //- // Buttons
                      //- .buttons-list
                      //-   .button.button--round.button-default(
                      //-     @click="taskEdit(task.id, task.title, task.description)"
                      //-   ) Edit
                      //-   .button.button--round(
                      //-     @click="taskCompleted(task.id, task.completed)"
                      //-     :class="[{ 'button-primary': !task.completed }, { 'button-light': task.completed  }]"
                      //-   )
                      //-     span(v-if="task.completed") Return
                      //-     span(v-else) Done

    //- // Edit popup
    //- .ui-messageBox__wrapper(
    //-   v-if="editingPopup"
    //-   @click="cancelTaskEdit"
    //-   :class="{active: editingPopup}"
    //- )
    //-   .ui-messageBox.fadeInDown(
    //-     @click.stop=""
    //-   )
        .ui-messageBox__header
          span.messageBox-title {{ titleEditing }}
          span.button-close(@click="cancelTaskEdit")
        .ui-messageBox__content
          p Title
          input(
            type="text"
            v-model='titleEditing'
            @keyup.esc="cancelTaskEdit"
          )
          p Description
          textarea(
            type="text"
            v-model='desrEditing'
            @keyup.esc="cancelTaskEdit"
          )
        .ui-messageBox__footer
          .button.button-light(@click="cancelTaskEdit") Cancel
          .button.button-primary(@click="finishTaskEdit") OK

</template>

<script>
export default {
  data () {
    return {
      filter: 'active',
      track: null,
      // Editing
      editingPopup: false,
      titleEditing: '',
      desrEditing: '',
      taskId: null
    }
  },
  methods: {
    // Completed
    taskCompleted (id, completed) {
      completed ? completed = false : completed = true

      this.$store.dispatch('completedTask', {
        id,
        completed
      })
        .then(() => {
          console.log(completed)
          // this.$store.dispatch('loadTasks')
        })
    },
    // Edit
    taskEdit (id, title, description) {
      this.editingPopup = !this.editingPopup
      // console.log({id, title, description})
      this.taskId = id
      this.titleEditing = title
      this.desrEditing = description
    },

    // Cancel button (POPUP)
    cancelTaskEdit () {
      this.editingPopup = !this.editingPopup

      // Reset
      this.taskId = null
      this.titleEditing = ''
      this.desrEditing = ''
    },

    // Done button
    finishTaskEdit () {
      // console.log(this.titleEditing)
      this.$store.dispatch('editTask', {
        id: this.taskId,
        title: this.titleEditing,
        description: this.desrEditing
      })
      this.editingPopup = !this.editingPopup
    },

    // Delete button
    deleteTask (id) {
      this.$store.dispatch('deleteTask', id)
        .then(() => {
          console.log('task deleted')
          this.$store.dispatch('loadTasks')
        })
    },
    totalTime () {
      const day = 86400000
      // const hour = 60000
      const elapsed = Date.now() - Number(this.track)
      return Math.floor(elapsed / day)
    },
    elapseTime (sumDay) {
      const day = 86400000
      return new Date(Number(this.track) + day * sumDay).toDateString()
    }
  },
  computed: {
    // Filter buttons
    tasksFilter () {
      if (this.filter === 'active') {
        return this.$store.getters.taskNotCompleted.filter(task => {
          return task.date === Number(this.track)
        })
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted.filter(task => {
          return task.date === Number(this.track)
        })
      } else if (this.filter === 'all') {
        return this.$store.getters.tasks
      }
      return this.filter === 'active'
    }
  }
}
</script>

<style lang="stylus" scoped>
//
// Header buttons list
//
.task-list__header
  display flex
  justify-content space-between
  align-items center
  margin-bottom 30px
.ui-title-1
  font-size 30px
  margin-bottom 0

//
// Task item
//
.task-item
  margin-bottom 20px
  .ui-checkbox:checked:before
    border-color #909399
  &.completed
    .ui-title-2,
    .ui-text-regular,
    .ui-tag
      text-decoration line-through
      color #909399
  &:last-child
    margin-bottom 0

.ui-text-day
  margin-bottom 30px

.ui-tag__wrapper
  margin-right 16px

// Info
.task-item__info
  display flex
  align-items center
  justify-content space-between
  margin-bottom 20px
  .button-close
    width 20px
    height @width
  .ui-label
    margin-right 8px

// Header
.task-item__header
  display flex
  align-items center
  margin-bottom 18px
  .ui-checkbox-wrapper
    margin-right 8px
  .ui-title-2
    margin-bottom 6px

// Body
.task-item__body
  margin-bottom 20px

// Footer
.tag-list
  margin-bottom 20px

.task-item__foter
  .buttons-list
    text-align right

// ALL buttons
.buttons-list
  .button
    margin-right 12px
    &:last-child
      margin-right 0

// POPUP
.ui-messageBox__wrapper
  &.active
    display flex
  .button-light
    margin-right 8px

</style>
