<template>
    <div>
        <div class="todo-list">
           
            <input 
                v-focus
                type="text"
                v-model="newTodoText" 
                @keydown.enter="addTodo"
                placeholder="Co musisz dziś zrobic?"/>

             <progressbar />

            <filters />

            <todo-item v-for="todo in filteredTodos"
                class="list-item"
                :key="todo.id"   
                :text="todo.text"
                :completed="todo.completed"
                @delete="removeTodo(todo)"
                @edit="openEditModal(todo)"
                @toggle="toggleCompleted(todo)"/>

                
        </div>

        
    </div>
</template>

<script>

import TodoItem from "./TodoItem.vue"
import Filters from "./Filters.vue"
import Progressbar from "./Progressbar.vue"
import { mapState, mapGetters, mapMutations } from "vuex"

export default {
    name: 'TodoList',
    components: {
        TodoItem,
        Filters,
        Progressbar
    },

    data() {
        return {
            newTodoText: '',
        }
    },

    computed: {
        ...mapState([
            'todosFilter',
        ]),

        ...mapGetters([
            'todosCount',
            'completedTodosCount',
            'notCompletedTodosCount'
        ]),

        filteredTodos() {
            return this.$store.getters.filteredTodos
        },
    },
    methods: {

        addTodo() {
            this.$store.dispatch('ADD_TODO', this.newTodoText)
            this.newTodoText = ''

            if (this.todosFilter == 'COMPLETED') {
                this.changeFilter('ALL')
            }
            
        },

        openEditModal(todo) {
            this.$store.commit('setEditedTodo', todo)
            this.$store.commit('openModal')
        },

        removeTodo(todo) {
            this.$store.dispatch('REMOVE_TODO', todo)
        },

        toggleCompleted(todo) {
            this.$store.dispatch('TOGGLE_COMPLETED', todo)
        },

        changeFilter(newFilter) {
            this.$store.commit('changeFilter', newFilter)
        }


    },

    mounted(){
        this.$store.dispatch('RETRIEVE_TODOS')
    }
}
</script>

<style scoped>
    input {
        width: 100%;
        padding: .8rem;
        font-size: 20px;
        color: inherit;
        margin-bottom: 20px;
        box-sizing: border-box;
    }

    .todo-list {
        
        padding: 40px 20px 20px 20px;
        min-height: 800px;
    }
</style>
