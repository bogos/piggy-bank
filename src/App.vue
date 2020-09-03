<template>
  <div id="app">
    <div class="container">
      <WalletManager />
    </div>
  </div>

</template>

<script>
// import AddTodo from "./components/AddTodo.vue";
// import Todos from "./components/Todos.vue";
import WalletManager from "./components/WalletManager.vue";

export default {
  name: 'App',
  components: {
    // Todos,
    // AddTodo,
    WalletManager
  }

}
</script>

<style>
  html, body, #app{
    min-height: 100%;
  }

  body {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    line-height: 1.6;
    background: #e8f7f0;
  }

  .container {
    max-width: 100%;
    min-height: 100%;
    margin: auto;
    overflow: auto;
    padding: 0 2rem;
  }
</style>
