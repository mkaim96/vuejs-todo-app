import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todosFilter: 'ALL',

    editModalOpened: false,

    editedTodo: null,

    todos: []
  },

  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo)
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
  },

  actions: {
    RETRIEVE_TODOS(context) {
      axios.get('http://localhost:64854/api/todos/get-all')
        .then(res => {
          if (res.status == 200) {
            context.state.todos = res.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    ADD_TODO(context, todoText) {

      if(todoText.trim().length < 1) {
        return;
      }

      axios.post('http://localhost:64854/api/todos/create', {
        text: todoText
      })
      .then(res => {
        if (res.status == 200) {
          context.commit('addTodo', res.data)  
        } else {
          alert("Coś poszło nie tak przy zapisywaniu zadania. Spróbuj jeszcze raz")
        }
      })
      .catch(err => {
        console.log(err)
      })
    },

    REMOVE_TODO(context, todo) {
      axios.delete(`http://localhost:64854/api/todos/delete/${todo.id}`)
      .then(res => {
        if(res.status == 200) {
          context.commit('removeTodo', todo)
        } else {
          alert('Coś poszło nie tak przy usuwaniu zadania. Spróbuj jeszcze raz')    
        }
      })
      .catch(err => {
      console.log(err)
      })
    },

    TOGGLE_COMPLETED(context, todo) {
      axios.get(`http://localhost:64854/api/todos/toggle-completed/${todo.id}`)
        .then(res => {
          if (res.status == 200) {
            context.commit('toggleCompleted', todo)
          } else {
            alert('Coś poszło nie tak. Spróbuj jeszcze raz')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    EDIT(context, newTodoText) {
      axios.post('http://localhost:64854/api/todos/edit', {
        todoId: context.state.editedTodo.id,
        newTodoText: newTodoText
      })
      .then(res => {
        if (res.status == 200) {
          context.commit('edit', newTodoText)
        } else {
          alert('Coś poszło nie tak przy edytowaniu zadania. Spróbuj jeszcze raz.')
        }
      })
      .catch(err => {
        console.log(err)
      })
    },

    LOGOUT(context) {
      axios.get('http://localhost:64854/logout')
      .then(() => {
        // refresh the page
        location = location
      })
      .catch(err => {
        console.log(err)
      })
    }


  }
})
