import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    nextId: 1,

    todosFilter: 'ALL',

    editModalOpened: false,

    editedTodo: null,

    todos: []
  },

  mutations: {
    addTodo(state, newTodoText) {
      if (newTodoText.length == 0) {
        return
      }

      state.todos.push({id: state.nextId, text: newTodoText, completed: false})

      state.nextId ++
    },

    removeTodo(state, todo) {
      let index = state.todos.indexOf(todo)
      state.todos.splice(index, 1)
    },

    toggleCompleted(state, todo) {
      let index = state.todos.indexOf(todo)
      state.todos[index].completed = !state.todos[index].completed
    },

    changeFilter(state, newFilter) {
      state.todosFilter = newFilter
    },

    openModal(state) {
      state.editModalOpened = true
    },

    closeModal(state) {
      state.editedTodo = null
      state.editModalOpened = false
    },

    setEditedTodo(state, todo) {
      state.editedTodo = todo
    },

    edit(state, newTodoText) {
      // find edited todo in todos array
      let todo = state.todos.find(todo => todo.id == state.editedTodo.id)

      // update the text
      todo.text = newTodoText

      // clear editedTodo
      state.editedTodo = null

      //close modal
      state.editModalOpened = false
    }
  },

  getters: {
    filteredTodos(state) {
      switch(state.todosFilter)
      {
        case 'ALL': {
          return state.todos
        }
        case 'COMPLETED': {
          return state.todos.filter(todo => todo.completed == true)
        }
        case 'NOT_COMPLETED': {
          return state.todos.filter(todo => todo.completed == false)
        }
        default: {
          return state.todos
        } 
      }
    },

    todosCount(state) {
      return state.todos.length
    },

    completedTodosCount(state) {
      return state.todos.filter(todo => todo.completed == true).length
    },

    notCompletedTodosCount(state) {
      return state.todos.filter(todo => todo.completed == false).length
    }
  }
})
