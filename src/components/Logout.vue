<template>
  <button @click="logout">Logout</button>
</template>

<script>
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default {
  methods: {
    async logout() {
      try {
        await signOut(auth);
        alert("Logged out successfully!");
        this.$emit("logout");
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>
