<!-- src/components/UserAuth.vue -->
<template>
  <div class="user-auth">
    <h2>Login / Signup</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <button @click="signup">Signup</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "UserAuth",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (
        users[this.username] &&
        users[this.username].password === this.password
      ) {
        localStorage.setItem("currentUser", this.username);
        this.$emit("login", this.username);
        this.error = "";
      } else {
        this.error = "Invalid username or password";
      }
    },
    signup() {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (users[this.username]) {
        this.error = "Username already exists";
      } else {
        users[this.username] = { password: this.password, trips: [] };
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", this.username);
        this.$emit("login", this.username);
        this.error = "";
      }
    },
  },
};
</script>

<style scoped>
.user-auth {
  text-align: center;
  margin: 20px;
}

input {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #2575fc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
