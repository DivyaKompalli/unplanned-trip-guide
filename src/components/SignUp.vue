<template>
  <div class="signup-container">
    <div class="signup-card">
      <div class="signup-header">
        <h2>Create Account</h2>
        <p class="subtitle">Start planning your perfect trip today</p>
      </div>

      <form @submit.prevent="signup" class="signup-form">
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
          <div class="password-input-container">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              required
              class="form-input"
            />
            <button
              @click.prevent="showPassword = !showPassword"
              class="toggle-password"
              type="button"
            >
              {{ showPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <div class="password-input-container">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="••••••••"
              required
              class="form-input"
            />
            <button
              @click.prevent="showConfirmPassword = !showConfirmPassword"
              class="toggle-password"
              type="button"
            >
              {{ showConfirmPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
        </div>

        <button type="submit" class="signup-button" :disabled="loading">
          <span v-if="!loading">Sign Up</span>
          <span v-else class="spinner"></span>
        </button>

        <div v-if="error" class="error-message">
          <p>{{ error }}</p>
          <button @click="error = ''" class="dismiss-error">×</button>
        </div>
      </form>

      <div class="divider">
        <span class="divider-line"></span>
        <span class="divider-text">or</span>
        <span class="divider-line"></span>
      </div>

      <button @click="signupWithGoogle" class="google-button">
        <img src="../assets/google-icon.svg" alt="Google" class="google-icon" />
        Continue with Google
      </button>

      <p class="login-link">
        Already have an account?
        <a @click="$emit('switch-view')" class="login-text">Login</a>
      </p>
    </div>
  </div>
</template>

<script>
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    async signup() {
      this.error = "";

      if (!this.email || !this.password || !this.confirmPassword) {
        this.error = "Please fill in all fields";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.error = "Passwords don't match";
        return;
      }

      if (this.password.length < 6) {
        this.error = "Password must be at least 6 characters";
        return;
      }

      this.loading = true;
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.$emit("signup-success");
      } catch (error) {
        this.error = this.getErrorMessage(error.code);
      } finally {
        this.loading = false;
      }
    },
    async signupWithGoogle() {
      try {
        await signInWithPopup(auth, googleProvider);
        this.$emit("signup-success");
      } catch (error) {
        this.error = this.getErrorMessage(error.code);
      }
    },
    getErrorMessage(code) {
      const messages = {
        "auth/email-already-in-use": "Email already in use",
        "auth/invalid-email": "Please enter a valid email address",
        "auth/weak-password": "Password must be at least 6 characters",
        "auth/popup-closed-by-user": "Sign up cancelled",
        default: "Sign up failed. Please try again.",
      };
      return messages[code] || messages.default;
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  background-color: var(--bg-color);
  padding: 2rem;
}

.signup-card {
  width: 100%;
  max-width: 420px;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  text-align: center;
}

.signup-header {
  margin-bottom: 2rem;
}

.signup-header h2 {
  font-size: 1.8rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.signup-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  background-color: white;
}

.password-input-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
}

.signup-button {
  width: 100%;
  padding: 0.85rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.signup-button:hover {
  background-color: var(--primary-hover);
}

.signup-button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: var(--error-bg);
  color: var(--error-text);
  border-radius: 6px;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dismiss-error {
  background: none;
  border: none;
  color: var(--error-text);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--border-color);
}

.divider-text {
  padding: 0 1rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.google-button {
  width: 100%;
  padding: 0.85rem;
  background-color: white;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.google-button:hover {
  background-color: #f7fafc;
  border-color: #cbd5e0;
}

.google-icon {
  width: 18px;
  height: 18px;
}

.login-link {
  margin-top: 1.5rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.login-text {
  color: var(--primary);
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease;
}

.login-text:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

@media (max-width: 480px) {
  .signup-card {
    padding: 1.75rem;
    box-shadow: none;
    border: 1px solid var(--border-color);
  }

  .signup-container {
    padding: 1rem;
    background-color: white;
    align-items: flex-start;
  }
}
</style>
