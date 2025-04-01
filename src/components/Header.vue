<template>
  <header class="app-header">
    <div class="container">
      <router-link to="/home" class="logo">
        <span>🌍</span> TravelPlanner
      </router-link>
      <nav class="nav">
        <div v-if="user" class="user-info">
          <span class="user-email">{{ user.email }}</span>
          <button @click="logout" class="logout-button">Logout</button>
        </div>
        <router-link v-else to="/" class="auth-button"> Login </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>
<style scoped>
.app-header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.auth-button,
.logout-button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-button:hover,
.logout-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
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

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .logo {
    font-size: 1.2rem;
  }

  .user-info {
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }
}
</style>
