<!-- src/components/Home.vue -->
<template>
  <section id="home" class="hero">
    <div class="hero-content">
      <h2>Welcome to Your Next Adventure!</h2>
      <p>Not sure where to go? Let us help you plan an unplanned trip!</p>
      <div class="search-box">
        <input
          type="text"
          id="search"
          placeholder="Search for a destination..."
        />
        <button>Search</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.hero {
  background: url("https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")
    no-repeat center center/cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
}

.hero-content {
  background: rgba(0, 0, 0, 0.6);
  padding: 40px;
  border-radius: 10px;
}

h2 {
  font-size: 2.5rem;
  margin: 0 0 20px;
}

p {
  font-size: 1.2rem;
  margin: 0 0 30px;
}

.search-box {
  display: flex;
  gap: 10px;
}

input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 300px;
  font-size: 1rem;
}

button {
  padding: 10px 20px;
  background-color: #2575fc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #6a11cb;
}
</style>
