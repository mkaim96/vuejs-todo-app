<template>
  <div id="app">
    <div class="nav">
      <a class="signout" @click.prevent="signOut">Wyloguj się</a>
    </div>
    
    <div class="container">
      
      <edit-modal />
      <todo-list />
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import EditModal from './components/EditModal'

export default {
  name: 'app',
  components: {
    TodoList,
    EditModal
  },

  methods: {
    signOut() {
      this.$store.dispatch("LOGOUT")
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
  font-size: 22px;
}

body {
  background: #11998e;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.container {
  max-width: 600px;
  min-width: 470px;
  margin: 0 auto;
  background: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 10px 9px 51px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 9px 51px -7px rgba(0,0,0,0.75);
  box-shadow: 10px 9px 51px -7px rgba(0,0,0,0.75);
}

.signout {
  color: #fff;
  font-size: 22px;
  transition: font-size .2s;
}

.signout:hover {
  cursor: pointer;
  font-size: 24px;
}

.nav {
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 10px;
  ;
}
</style>
