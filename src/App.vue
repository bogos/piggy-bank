<template>
  <div id="app">
    <Modal v-if="this.$store.state.isOpenModal"/>
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
import Modal from './components/Modal';

export default {
  name: 'App',
  components: {
    Navigation,
    Modal
  }
}
</script>

<style lang="scss">
  $background-color: #f7f7f7;

  @font-face {
    font-family: 'Gotham';
    src: url('./assets/fonts/GothamBold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
    
  @font-face {
    font-family: 'Gotham';
    src: url('./assets/fonts/GothamMedium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham';
    src: url('./assets/fonts/GothamBook.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham';
    src: url('./assets/fonts/GothamLight.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  html, body, #app{
    min-height: 100%;
  }

  body {
    font-family: "Gotham", sans-serif;
    line-height: 1.6;
    font-weight: 300;
    background: $background-color;
  }

  .container {
    max-width: 100%;
    min-height: 100%;
    margin: auto;
    overflow: auto;
    padding: 0 2rem;
  }
</style>
