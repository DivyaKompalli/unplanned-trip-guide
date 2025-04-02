<template>
  <div class="travel-planner-app">
    <Header :user="user" @logout="handleLogout" />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { Header, Footer },
  data() {
    return {
      user: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (!user && this.$route.meta.requiresAuth) {
        this.$router.push("/");
      }
    });
  },
  methods: {
    handleLogout() {
      auth.signOut().then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style>
:root {
  --primary: #ff9933; /* Saffron */
  --primary-hover: #ff8c00;
  --secondary: #138808; /* Green */
  --accent: #ff6347;
  --text-main: #333333;
  --text-secondary: #555555;
  --text-muted: #777777;
  --border-color: #e0e0e0;
  --bg-color: #f5f5f5;
  --card-bg: white;
  --error-bg: #ffebee;
  --error-text: #d32f2f;
  --nav-bg: #ffffff;
  --footer-bg: linear-gradient(135deg, #ff9933, #138808);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", "Noto Sans Devanagari", sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  line-height: 1.6;
  min-height: 100vh;
}

.travel-planner-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
}

/* Indian-themed scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-hover);
}
</style>
