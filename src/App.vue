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
/* Keep all existing styles exactly the same */
:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --accent: #ec4899;
  --text-main: #2d3748;
  --text-secondary: #4a5568;
  --text-muted: #718096;
  --border-color: #e2e8f0;
  --bg-color: #f8fafc;
  --card-bg: white;
  --error-bg: #fee2e2;
  --error-text: #dc2626;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  line-height: 1.6;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
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

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-email {
  font-size: 0.9rem;
  color: var(--text-secondary);
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
</style>
