<template>
  <div id="app">
    <div class="container"> 
      <div>
        <Navigation />
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
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
