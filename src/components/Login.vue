<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>Welcome Back</h2>
        <p class="subtitle">Login to continue planning your trip</p>
      </div>

      <form @submit.prevent="login" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="your@email.com"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            class="form-input"
          />
        </div>

        <button type="submit" class="auth-button">Login</button>
      </form>

      <div class="divider">
        <span class="divider-line"></span>
        <span class="divider-text">or</span>
        <span class="divider-line"></span>
      </div>

      <button @click="loginWithGoogle" class="google-button">
        <img src="../assets/google-icon.svg" alt="Google" class="google-icon" />
        Continue with Google
      </button>

      <p class="switch-auth">
        Don't have an account?
        <router-link to="/signup" class="switch-link">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/home");
      } catch (error) {
        this.error = "Invalid email or password";
        console.error(error);
      }
    },
    async loginWithGoogle() {
      try {
        await signInWithPopup(auth, googleProvider);
        this.$router.push("/home");
      } catch (error) {
        this.error = "Google login failed";
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 2rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  text-align: center;
}

.auth-header {
  margin-bottom: 2rem;
  text-align: center;
}

.auth-header h2 {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #718096;
  font-size: 0.95rem;
}

.auth-form {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.auth-button {
  width: 100%;
  padding: 0.85rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.5rem;
}

.auth-button:hover {
  background-color: #4f46e5;
}

.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #e2e8f0;
}

.divider-text {
  padding: 0 1rem;
  color: #718096;
  font-size: 0.85rem;
}

.google-button {
  width: 100%;
  padding: 0.85rem;
  background-color: white;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.google-button:hover {
  background-color: #f7fafc;
}

.google-icon {
  width: 18px;
  height: 18px;
}

.switch-auth {
  margin-top: 1.5rem;
  color: #718096;
  font-size: 0.95rem;
}

.switch-link {
  color: #6366f1;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
}

.switch-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.75rem;
  }

  .auth-container {
    padding: 1rem;
    align-items: flex-start;
  }
}
</style>
