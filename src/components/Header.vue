<!-- src/components/Header.vue -->
<template>
  <header>
    <h1>Unplanned Trip Guide</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#destinations">Destinations</a></li>
        <li><a href="#trip-generator">Trip Generator</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: bold;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav ul li {
  display: inline;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #ffdd57;
}
</style>
