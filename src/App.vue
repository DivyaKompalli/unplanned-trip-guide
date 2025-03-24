<!-- src/App.vue -->
<template>
  <div>
    <Header />
    <Home />
    <TripGenerator />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
import TripGenerator from "./components/TripGenerator.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Home,
    TripGenerator,
    Footer,
  },
};
</script>
